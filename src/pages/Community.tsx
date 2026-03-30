import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/layout/Navbar";

const Community = () => {

  const [offers, setOffers] = useState<any[]>([]);
  const [cases, setCases] = useState<any[]>([]);
  const [tweets, setTweets] = useState<any[]>([]);

  const [clickCount, setClickCount] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [mode, setMode] = useState<"offer" | "case">("offer");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [offerImage, setOfferImage] = useState<File | null>(null);
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);

  const [tweetText, setTweetText] = useState("");

  const fetchData = async () => {
    const { data: offersData } = await supabase.from("offers").select("*");
    const { data: casesData } = await supabase.from("success_cases").select("*");
    const { data: tweetsData } = await supabase
      .from("tweets")
      .select("*")
      .order("created_at", { ascending: false });

    setOffers(offersData || []);
    setCases(casesData || []);
    setTweets(tweetsData || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSecretClick = () => {
    setClickCount(prev => {
      if (prev + 1 === 3) {
        setShowAdmin(true);
        return 0;
      }
      return prev + 1;
    });
  };

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    await supabase.storage.from("media").upload(fileName, file);
    const { data } = supabase.storage.from("media").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleAdd = async () => {
    if (!title.trim()) return;

    let imageUrl = null;
    let beforeUrl = null;
    let afterUrl = null;

    if (mode === "offer" && offerImage) {
      imageUrl = await uploadImage(offerImage);
    }

    if (mode === "case") {
      if (beforeImage) beforeUrl = await uploadImage(beforeImage);
      if (afterImage) afterUrl = await uploadImage(afterImage);
    }

    if (mode === "offer") {
      await supabase.from("offers").insert({
        title,
        description,
        image_url: imageUrl,
      });
    } else {
      await supabase.from("success_cases").insert({
        title,
        description,
        before_image: beforeUrl,
        after_image: afterUrl,
      });
    }

    setTitle("");
    setDescription("");
    fetchData();
  };

  const addTweet = async () => {
    if (!tweetText.trim()) return;

    await supabase.from("tweets").insert({
      content: tweetText,
      username: "User",
    });

    setTweetText("");
    fetchData();
  };

  return (
    <>
      <Navbar />

      <div className="pt-[90px] px-4 md:px-8 max-w-6xl mx-auto space-y-14">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h1
            onClick={handleSecretClick}
            className="text-3xl md:text-4xl font-semibold cursor-pointer"
          >
            Community
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
           اكتشف العروض الجديده يوميا .. قول رايك بصراحه !
          </p>
        </div>

        {/* ADMIN */}
        {showAdmin && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-xl w-full max-w-md space-y-4 border">

              <h2 className="text-lg font-semibold">Admin Panel</h2>

              <div className="flex gap-2">
                <Button onClick={() => setMode("offer")} variant={mode === "offer" ? "default" : "outline"}>
                  Offer
                </Button>
                <Button onClick={() => setMode("case")} variant={mode === "case" ? "default" : "outline"}>
                  Case
                </Button>
              </div>

              <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
              <Textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />

              {mode === "offer" && (
                <Input type="file" onChange={e => setOfferImage(e.target.files?.[0] || null)} />
              )}

              {mode === "case" && (
                <div className="flex gap-2">
                  <Input type="file" onChange={e => setBeforeImage(e.target.files?.[0] || null)} />
                  <Input type="file" onChange={e => setAfterImage(e.target.files?.[0] || null)} />
                </div>
              )}

              <Button onClick={handleAdd} className="w-full">Submit</Button>
              <Button variant="outline" onClick={() => setShowAdmin(false)}>Close</Button>

            </div>
          </div>
        )}

        {/* OFFERS */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Latest Offers</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {offers.map(o => (
              <div key={o.id} className="rounded-xl border overflow-hidden bg-card">

                {o.image_url && (
                  <img src={o.image_url} className="h-44 w-full object-cover" />
                )}

                <div className="p-4">
                  <h3 className="font-medium">{o.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{o.description}</p>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* CASES */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Cases</h2>

          <div className="space-y-6">
            {cases.map(c => (
              <div key={c.id} className="border rounded-xl overflow-hidden bg-card">

                <div className="grid md:grid-cols-2">
                  {c.before_image && <img src={c.before_image} className="h-56 w-full object-cover" />}
                  {c.after_image && <img src={c.after_image} className="h-56 w-full object-cover" />}
                </div>

                <div className="p-4">
                  <h3 className="font-medium">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* TWEETS */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Community</h2>

          <div className="flex gap-2 mb-5">
            <Input
              placeholder="Share your experience..."
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
            />
            <Button onClick={addTweet}>Post</Button>
          </div>

          <div className="space-y-3">
            {tweets.map(t => (
              <div key={t.id} className="flex gap-3 p-4 border rounded-xl bg-card">

                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                  {t.username?.charAt(0)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{t.username}</span>
                    <span className="text-muted-foreground text-xs">
                      {new Date(t.created_at).toLocaleString()}
                    </span>
                  </div>

                  <p className="mt-1 text-sm">{t.content}</p>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
};

export default Community;