import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Upload, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Consultation = () => {
  const { toast } = useToast();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [payment, setPayment] = useState<any>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [question, setQuestion] = useState("");

  // ✅ جلب بيانات الدفع
  useEffect(() => {
    fetchPayment();
  }, []);

  const fetchPayment = async () => {
    const { data } = await supabase
      .from("payment_settings")
      .select("*")
      .eq("id", 1)
      .single();

    setPayment(data);
  };

  // ✅ رفع الصور
  const uploadPhotos = async (): Promise<string[]> => {
    const urls: string[] = [];

    for (const file of selectedFiles) {
      const fileName = `payments/${Date.now()}_${file.name}`;

      const { error } = await supabase.storage
        .from("payments")
        .upload(fileName, file);

      if (!error) {
        const { data } = supabase.storage
          .from("payments")
          .getPublicUrl(fileName);

        urls.push(data.publicUrl);
      }
    }

    return urls;
  };

  // ✅ اختيار صورة
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedFiles(Array.from(e.target.files));
  };

  const removeImage = () => {
    setSelectedFiles([]);
  };

  // ✅ submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !question.trim()) {
      toast({
        title: "من فضلك املأ كل البيانات",
        variant: "destructive",
      });
      return;
    }

    if (selectedFiles.length === 0) {
      toast({
        title: "ارفع صورة الدفع",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const photoUrls = await uploadPhotos();

      const { error } = await supabase
        .from("consultationszoom")
        .insert([
          {
            name: name.trim(),
            phone: phone.trim(),
            whatsapp: whatsapp.trim() || null,
            topic: question.trim(),
            payment_screenshot: photoUrls[0],
          },
        ]);

      if (error) throw error;

      setSubmitted(true);
    } catch (err: any) {
      toast({
        title: "خطأ",
        description: err.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  // ✅ success
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <CheckCircle2 className="mx-auto text-green-400 w-20 h-20 mb-4" />
          <h2 className="text-3xl font-bold">تم إرسال طلبك ✅</h2>
          <p className="text-gray-400 mt-2">
            سيتم التواصل معك قريبًا عبر الهاتف أو واتساب
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
      >

        <h1 className="text-3xl font-bold text-center text-white">
          استشارة أونلاين عبر زووم 🎥
        </h1>

        {/* 💳 بيانات الدفع */}
        {payment && (
          <div className="bg-yellow-500/10 border border-yellow-400/20 p-4 rounded-xl text-center">
            <p className="text-yellow-400 font-bold mb-2">💳 طرق الدفع</p>
            <p className="text-white">{payment.vodafone}</p>
            <p className="text-white">{payment.instapay}</p>
            <p className="text-green-400 text-sm mt-2">
              ⚠️ لن يتم تأكيد الحجز بدون رفع صورة الدفع
            </p>
          </div>
        )}

        {/* Inputs */}
        <Input
          placeholder="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/10 text-white"
        />

        <Input
          placeholder="رقم الموبايل"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-white/10 text-white"
        />

        <Input
          placeholder="رقم واتساب"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="bg-white/10 text-white"
        />

        <Textarea
          placeholder="الاستشارة عن ايه"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="bg-white/10 text-white"
        />

        {/* 🖼️ رفع صورة + preview */}
        {selectedFiles.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-600 p-6 rounded-xl text-center cursor-pointer hover:border-blue-500"
          >
            <Upload className="mx-auto mb-2 text-gray-400" />
            <p className="text-gray-400">اضغط لرفع صورة الدفع</p>
          </div>
        ) : (
          <div className="relative">
            <img
              src={URL.createObjectURL(selectedFiles[0])}
              className="w-full h-40 object-cover rounded-xl"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 p-1 rounded-full"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Button */}
        <Button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 text-lg rounded-xl"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              جاري الإرسال...
            </>
          ) : (
            "تأكيد الحجز 🚀"
          )}
        </Button>

      </motion.form>
    </div>
  );
};

export default Consultation;