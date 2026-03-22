import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

type BlogContent = {
  title: string; excerpt: string; date: string; category: string;
  image: string; readTime: string; content: string[];
};

const blogDataEN: Record<string, BlogContent> = {
  "fue-hair-transplant-guide": {
    title: "Everything You Need to Know About FUE Hair Transplant",
    excerpt: "FUE is the gold standard for hair transplant procedures. Learn about the technique, recovery, and what to expect at every stage.",
    date: "Mar 1, 2025", category: "Hair Restoration", image: "/images/service-hair.jpg", readTime: "8 min",
    content: [
      "FUE (Follicular Unit Extraction) is the most advanced and popular hair transplant technique available today. Unlike older strip methods (FUT), FUE extracts individual hair follicles from the donor area using micro-punches, leaving no linear scar and allowing for a much faster recovery. This technique has revolutionized hair restoration and is now the preferred method worldwide.",
      "## How Does FUE Work?\n\nThe procedure involves extracting individual follicular units from the back and sides of the head using a specialized micro-punch tool (0.6-0.9mm in diameter). These grafts are then carefully implanted into the thinning or balding areas following the natural growth pattern of your hair.\n\nThe key advantage of FUE is that each follicle is extracted individually, resulting in tiny, virtually invisible scars in the donor area. This means you can wear your hair short without any visible signs of surgery.",
      "## FUE vs DHI: What's the Difference?\n\nWhile both are advanced techniques, they differ in the implantation method:\n\n- **FUE**: Channels are created first, then grafts are placed using forceps\n- **DHI (Direct Hair Implantation)**: Uses a Choi implanter pen to create the channel and place the graft simultaneously\n\nDHI offers slightly more precision for hairline work, while FUE allows for treating larger areas in a single session. At Bestar Clinic, we use both techniques and recommend the best approach for each patient.",
      "## Who Is a Good Candidate?\n\nIdeal candidates for FUE hair transplant include:\n- Men and women experiencing androgenetic alopecia (pattern hair loss)\n- Patients with sufficient donor hair density (usually >60 follicles/cm²)\n- Those seeking a minimally invasive procedure with no linear scar\n- Patients who want to wear their hair short after surgery\n- Those who have stabilized hair loss (ideally with medication)\n- Healthy individuals without uncontrolled medical conditions",
      "## The FUE Procedure at Bestar Clinic\n\nAt Bestar Clinic, our FUE procedures are performed by experienced surgeons using the latest technology:\n\n1. **Consultation & 3D Planning**: We analyze your hair loss pattern using dermoscopy and design a natural hairline using 3D simulation software. You'll see expected results before the procedure.\n2. **Pre-Op Testing**: Blood tests and scalp analysis to ensure safety and optimal graft planning.\n3. **Donor Extraction**: Individual follicles are extracted under local anesthesia. You'll be comfortable throughout — many patients watch movies or nap.\n4. **Channel Opening**: Recipient sites are created at precise angles (40-45°) and depths matching your natural growth pattern.\n5. **Graft Implantation**: Follicles are carefully placed for maximum density (40-60 grafts/cm²) and natural direction.\n6. **Post-Op Kit**: You'll receive a complete aftercare kit with medications, special shampoo, spray, and detailed instructions.",
      "## Recovery Timeline\n\n- **Day 1-3**: Mild swelling and redness. Sleep elevated. Take prescribed medications.\n- **Day 3-5**: First wash with special technique. Swelling begins to subside.\n- **Week 1**: Small crusts form around grafts (normal). Return to desk work.\n- **Week 2-3**: Crusts fall off. Transplanted hair begins to shed (shock loss — completely normal!).\n- **Month 1-2**: Donor area fully healed. Recipient area looks like it did before (patience needed!).\n- **Month 3-4**: New hair begins to grow! You'll notice fine baby hairs emerging.\n- **Month 6-8**: Significant improvement visible. Hair thickening and lengthening.\n- **Month 12-18**: Full results visible with thick, natural-looking hair.",
      "## Aftercare Tips for Best Results\n\nFollowing proper aftercare is crucial for optimal graft survival:\n- Sleep with head elevated at 45° for the first 5 nights\n- Don't touch, scratch, or pick at the grafted area\n- Avoid direct sunlight for 4 weeks — wear a loose hat outdoors\n- No swimming, sauna, or intense exercise for 4 weeks\n- Follow the prescribed medication schedule strictly\n- Eat a balanced diet rich in protein, vitamins, and minerals\n- Don't smoke — it impairs blood flow and graft survival",
      "## Why Choose Bestar Clinic?\n\nWith over 15,000 successful procedures and patients from 40+ countries, Bestar Clinic is a leader in hair restoration in the region. Our advantages include:\n- Board-certified surgeons with 10+ years of experience\n- Latest FUE and DHI technology including sapphire blades\n- 95-98% graft survival rate\n- Comprehensive VIP packages for international patients\n- 24/7 post-operative support and follow-up\n- Transparent pricing with no hidden fees",
    ],
  },
  "botox-vs-fillers": {
    title: "Botox vs Fillers: Which Is Right for You?",
    excerpt: "Both treatments rejuvenate your appearance, but they work in fundamentally different ways. Here's a comprehensive guide to help you choose.",
    date: "Feb 20, 2025", category: "Aesthetics", image: "/images/before-after-botox-1.jpg", readTime: "7 min",
    content: [
      "Botox and dermal fillers are two of the most popular non-surgical cosmetic treatments worldwide, with millions of procedures performed each year. While both aim to rejuvenate your appearance and reduce signs of aging, they work in fundamentally different ways and are best suited for different concerns. Understanding these differences is key to choosing the right treatment.",
      "## What Is Botox?\n\nBotox (Botulinum Toxin Type A) is a neuromodulator that temporarily relaxes targeted facial muscles. By reducing muscle activity, it smooths out dynamic wrinkles — those caused by repeated facial movements like frowning, squinting, or raising your eyebrows.\n\n**Best for treating:**\n- Forehead horizontal lines\n- Crow's feet (lines around the eyes)\n- Frown lines (between the eyebrows — the '11' lines)\n- Bunny lines on the nose\n- Chin dimpling\n- Excessive sweating (hyperhidrosis)\n- Jaw tension and teeth grinding (masseter Botox)",
      "## What Are Dermal Fillers?\n\nDermal fillers are injectable gels — most commonly made of hyaluronic acid (HA) — that add volume and structure to the face. They physically fill in areas that have lost volume due to the natural aging process.\n\n**Best for treating:**\n- Nasolabial folds (nose-to-mouth smile lines)\n- Lip volume and definition\n- Cheek volume restoration\n- Under-eye hollows (tear troughs)\n- Jawline definition and chin projection\n- Marionette lines (mouth-to-chin)\n- Temple hollowing\n- Hand rejuvenation",
      "## Key Differences at a Glance\n\n- **Mechanism**: Botox relaxes muscles; Fillers add volume\n- **Results onset**: Botox takes 3-7 days; Fillers are immediate\n- **Duration**: Botox lasts 3-6 months; Fillers last 6-18 months\n- **Treatment time**: Botox is 10-15 minutes; Fillers are 15-45 minutes\n- **Reversibility**: Botox wears off naturally; HA fillers can be dissolved\n- **Downtime**: Both have minimal to no downtime",
      "## The 'Liquid Facelift': Combining Both\n\nMany patients achieve the best results by combining both Botox and fillers in what's often called a 'liquid facelift.' This approach addresses both dynamic wrinkles (with Botox) and volume loss (with fillers) for comprehensive facial rejuvenation.\n\nFor example, a typical combination treatment might include:\n- Botox for forehead and crow's feet\n- Cheek filler for midface volume\n- Lip filler for subtle enhancement\n- Jawline filler for definition\n\nThis combination can take 5-10 years off your appearance without surgery.",
      "## Choosing the Right Treatment\n\nDuring your consultation at Bestar Clinic, our experienced doctors will:\n- Analyze your facial anatomy and bone structure\n- Assess your skin quality and elasticity\n- Understand your aesthetic goals and concerns\n- Recommend a personalized treatment plan\n- Show you before/after photos of similar patients\n- Discuss realistic expectations and timelines",
      "## Safety at Bestar Clinic\n\nAll our injectable treatments are performed by board-certified doctors using only FDA-approved, premium-quality products from trusted manufacturers. We prioritize:\n- Natural-looking results that enhance your features\n- Conservative approach — we can always add more later\n- Comprehensive medical history review\n- Sterile technique and proper protocols\n- Follow-up care and touch-up appointments",
    ],
  },
  "recovery-tips": {
    title: "5 Essential Tips for Faster Recovery After Hair Transplant",
    excerpt: "Follow these expert-recommended tips to ensure the best possible results and fastest recovery after your hair transplant procedure.",
    date: "Feb 10, 2025", category: "Recovery", image: "/images/before-after-hair-1.jpg", readTime: "6 min",
    content: [
      "A successful hair transplant doesn't end in the operating room. How you care for your scalp in the weeks following the procedure plays a crucial role in graft survival and achieving the best possible results. At Bestar Clinic, we've compiled our top tips based on thousands of successful procedures.",
      "## Tip 1: Follow Your Doctor's Instructions Precisely\n\nYour surgeon will provide detailed aftercare instructions tailored to your specific procedure. These include:\n- Medication schedules (antibiotics, anti-inflammatory, pain relief)\n- Sleeping position guidance (elevated at 45° for 5 nights)\n- When to resume daily activities\n- Hair washing instructions and timeline\n- Products to use and avoid\n\nThese instructions exist for a reason — they're based on years of clinical experience. Even small deviations can affect results.",
      "## Tip 2: Master the Art of Sleeping Elevated\n\nFor the first 5-7 nights after surgery, sleep with your head elevated at a 45-degree angle. This reduces swelling significantly and protects newly transplanted grafts from pressure and friction.\n\n**Practical tips:**\n- Use 2-3 pillows stacked, or a travel/neck pillow\n- Consider sleeping in a recliner chair for the first few nights\n- Use a U-shaped travel pillow to prevent rolling onto your side\n- Place a clean towel on your pillow each night\n- If you tend to move during sleep, some patients sleep semi-sitting against a pillow wall",
      "## Tip 3: Protect Your Scalp from the Elements\n\nYour transplanted grafts are vulnerable in the first few weeks. Protect them from:\n\n- **Sun**: Direct UV exposure can damage healing skin and grafts. Wear a loose-fitting hat outdoors for at least 4-6 weeks. Avoid tight caps that press on grafts.\n- **Rain**: Rain can carry pollutants. Cover your head if caught in rain.\n- **Wind & Dust**: Avoid dusty environments for 2 weeks.\n- **Cold**: Extreme cold can reduce blood flow to the scalp.",
      "## Tip 4: Be Patient with the Shedding Phase\n\nThis is perhaps the most important tip: **transplanted hair WILL fall out at 2-4 weeks.** This is called 'shock loss' and is a completely normal, expected part of the process.\n\nHere's what's happening: The transplanted hair shafts shed, but the living follicle root remains safely implanted beneath the skin. New, permanent hair will begin growing from these follicles within 3-4 months.\n\nDon't panic! Don't compare yourself to others' timelines. Trust the process — every patient who sees amazing final results went through this exact same shedding phase.",
      "## Tip 5: Fuel Your Recovery with Proper Nutrition\n\nWhat you eat directly impacts hair growth and graft survival. Focus on:\n\n- **Protein**: Essential for hair growth. Eat lean meats, fish, eggs, legumes (aim for 60-80g daily)\n- **Iron**: Carries oxygen to follicles. Red meat, spinach, lentils\n- **Zinc**: Supports hair tissue growth. Nuts, seeds, whole grains\n- **Biotin (Vitamin B7)**: Strengthens hair. Eggs, avocado, salmon\n- **Vitamin D**: Stimulates follicles. Sunlight, fatty fish, supplements\n- **Vitamin C**: Aids collagen production. Citrus fruits, bell peppers\n- **Omega-3 fatty acids**: Nourishes scalp. Fish, walnuts, flaxseed\n- **Water**: Stay well-hydrated (aim for 2-3 liters daily)\n\n**Avoid**: Smoking (reduces blood flow by 30%), excessive alcohol, processed foods, excessive caffeine",
      "## Bonus: Bestar Clinic's Post-Op Support Program\n\nAt Bestar Clinic, we don't just perform the procedure and send you home. Our comprehensive post-operative support includes:\n- Detailed aftercare kit with all necessary products\n- WhatsApp support line available 24/7\n- Scheduled follow-up checks at day 3, week 1, month 1, month 3, and month 6\n- Photo tracking of your progress\n- PRP sessions offered to boost graft survival and accelerate growth\n- Personalized advice throughout your recovery journey",
    ],
  },
  "prp-science": {
    title: "The Science Behind PRP Hair Treatment: How Your Blood Grows Hair",
    excerpt: "Platelet-rich plasma therapy is revolutionizing hair loss treatment. Discover the science, research, and real results behind this innovative therapy.",
    date: "Jan 25, 2025", category: "Hair Restoration", image: "/images/before-after-beard-1.jpg", readTime: "7 min",
    content: [
      "Platelet-Rich Plasma (PRP) therapy is one of the most exciting developments in hair loss treatment in recent years. This innovative, natural treatment uses your body's own healing mechanisms to stimulate hair growth, improve thickness, and slow hair loss. But how exactly does it work? Let's dive into the science.",
      "## What Is PRP?\n\nPRP is a concentration of platelets derived from your own blood. While we typically think of platelets as the cells that help blood clot, they actually contain hundreds of proteins called growth factors that play crucial roles in tissue healing and regeneration.\n\nWhen we concentrate these platelets (typically 3-5x above normal blood levels), we create a powerful regenerative serum that, when injected into the scalp, can reactivate dormant hair follicles.",
      "## The Science: Why PRP Works for Hair\n\nMultiple peer-reviewed studies have demonstrated that PRP therapy for hair loss works through several biological mechanisms:\n\n- **Increased blood supply**: PRP promotes angiogenesis (new blood vessel formation) around hair follicles, improving nutrient delivery\n- **Stem cell activation**: Growth factors in PRP activate stem cells in the dermal papilla of hair follicles\n- **Extended growth phase**: PRP prolongs the anagen (active growth) phase of the hair cycle\n- **Reduced inflammation**: Anti-inflammatory properties help create a healthier scalp environment\n- **Collagen production**: Stimulates collagen around follicles, strengthening the hair foundation\n- **Cell proliferation**: Promotes multiplication of dermal papilla cells, the 'command center' of hair follicles",
      "## Clinical Evidence\n\nResearch published in journals including Dermatologic Surgery, Journal of Cutaneous and Aesthetic Surgery, and others has shown:\n- 30-40% increase in hair count after a course of PRP treatments\n- Significant improvement in hair thickness and diameter\n- Reduced hair shedding in 80% of patients\n- Enhanced results when combined with other treatments\n- High safety profile with minimal side effects",
      "## The PRP Procedure Step by Step\n\n1. **Blood Draw**: A small amount of blood (20-30ml — less than a standard blood donation) is drawn from your arm\n2. **Double-Spin Centrifugation**: Your blood is processed in a medical centrifuge using a double-spin technique to achieve optimal platelet concentration (3-5x)\n3. **Activation**: The concentrated PRP may be activated with calcium chloride to trigger the release of growth factors\n4. **Micro-Injection**: Using ultra-fine needles (30-gauge), PRP is injected into the scalp at the level of the hair follicle roots. Topical anesthesia ensures comfort\n5. **Duration**: The entire procedure takes about 30-45 minutes",
      "## Treatment Protocol for Best Results\n\nBased on current research and our clinical experience, we recommend:\n\n- **Initial Phase**: 3-4 sessions, spaced 4 weeks apart\n- **Consolidation**: 2 sessions at 2-month intervals\n- **Maintenance**: 1 session every 4-6 months\n- **Results Timeline**: Visible improvement typically begins after 2-3 sessions, with maximum results at 6-9 months",
      "## PRP + Hair Transplant: A Powerful Combination\n\nPRP is an excellent complement to hair transplant surgery. Research shows that when used before, during, and after a transplant, PRP can:\n- Improve graft survival rates by 15-20%\n- Accelerate healing of both donor and recipient areas\n- Enhance density of transplanted hair\n- Strengthen existing native hair in surrounding areas\n- Reduce post-operative inflammation and swelling\n\nAt Bestar Clinic, we routinely include PRP sessions as part of our hair transplant packages.",
      "## Is PRP Right for You?\n\nPRP works best for:\n- Early to moderate hair thinning (Norwood 2-4 or Ludwig 1-2)\n- Both men and women\n- Those wanting to complement medical hair loss treatments\n- Post-transplant patients seeking enhanced results\n- Those preferring a natural, non-surgical approach\n\nPRP may be less effective for completely bald areas where follicles are no longer present. Book a free consultation at Bestar Clinic for a personalized assessment.",
    ],
  },
  "skin-rejuvenation-options": {
    title: "Skin Rejuvenation: A Complete Guide to Your Options",
    excerpt: "From chemical peels to laser treatments, explore the full range of skin rejuvenation options available at Bestar Clinic.",
    date: "Jan 15, 2025", category: "Skin Care", image: "/images/before-after-skin-1.jpg", readTime: "7 min",
    content: [
      "Achieving youthful, radiant skin is more accessible than ever with today's advanced dermatological treatments. Whether you're dealing with fine lines, sun damage, uneven texture, acne scars, or just general dullness, there's a scientifically-proven solution for you. This guide breaks down your options to help you make an informed decision.",
      "## Chemical Peels\n\nChemical peels use carefully formulated acid solutions to remove damaged outer layers of skin, revealing fresh, smoother skin underneath. At Bestar Clinic, we offer three levels:\n\n- **Superficial Peels** (Glycolic, Lactic acid): For mild texture issues and dullness. No downtime — just a healthy glow. Great for first-timers and maintenance.\n- **Medium Peels** (TCA): Target fine lines, moderate sun damage, and pigmentation. 3-5 days of peeling. Dramatic improvement in skin quality.\n- **Deep Peels** (Phenol): For significant wrinkles, deep scars, and severe sun damage. More intensive recovery but remarkable results. Performed under sedation.",
      "## Microneedling (Collagen Induction Therapy)\n\nMicroneedling creates thousands of controlled micro-channels in the skin using a device with fine needles. This triggers your body's natural wound-healing response, producing new collagen and elastin.\n\n**Benefits include:**\n- Reduced pore size and refined skin texture\n- Improved appearance of acne scars and stretch marks\n- Enhanced absorption of topical serums (up to 300% better penetration)\n- Reduced fine lines and early wrinkles\n- Suitable for all skin types and colors\n\n**At Bestar Clinic**, we combine microneedling with PRP (Platelet-Rich Plasma) for supercharged results — what we call the 'Vampire Facial.'",
      "## Laser Skin Resurfacing\n\nLaser treatments use concentrated beams of light energy to remove damaged skin layer by layer or create microscopic treatment zones. We offer several laser modalities:\n\n- **Fractional CO2 Laser**: The gold standard for deep wrinkles, acne scars, and skin tightening. Creates microscopic columns of treated tissue while leaving surrounding skin intact for faster healing.\n- **Nd:YAG Laser**: Safe for all skin types including darker skin. Excellent for pigmentation, vascular concerns, and skin tightening.\n- **IPL (Intense Pulsed Light)**: Broadband light that targets sun damage, redness, broken capillaries, and age spots. Minimal downtime.\n- **Erbium Laser**: Precise surface-level resurfacing for fine lines and mild scarring with shorter recovery than CO2.",
      "## HydraFacial\n\nThe HydraFacial is a multi-step, medical-grade treatment that cleanses, exfoliates, extracts impurities, and hydrates the skin simultaneously using patented Vortex technology. It delivers instant results with zero downtime.\n\n**The 4-step process:**\n1. **Cleanse + Peel**: Gentle exfoliation and resurfacing\n2. **Extract + Hydrate**: Painless suction extraction with hydrating serums\n3. **Fuse + Protect**: Infusion of antioxidants and peptides\n4. **LED Boost**: Optional LED light therapy for enhanced results\n\nPerfect as a monthly maintenance treatment or as a quick skin refresh before special events.",
      "## Mesotherapy\n\nMesotherapy involves micro-injecting cocktails of vitamins, minerals, amino acids, and hyaluronic acid directly into the middle layer (mesoderm) of the skin. This delivers nutrients exactly where they're needed, resulting in:\n- Intense hydration from within\n- Improved skin luminosity and glow\n- Reduced fine lines\n- Enhanced skin elasticity\n\nIt's like a vitamin IV drip, but specifically for your skin.",
      "## Choosing the Right Treatment for You\n\nThe best rejuvenation treatment depends on several factors:\n- **Your specific concerns**: Wrinkles? Pigmentation? Texture? Scars?\n- **Your skin type**: Some treatments work differently on various skin types\n- **Your lifestyle**: Can you afford downtime, or do you need zero-downtime options?\n- **Your budget**: From affordable monthly facials to premium laser packages\n- **Your age**: Preventive care (20s-30s) vs. corrective treatments (40s+)\n\nOur dermatologists at Bestar Clinic will assess your skin during a free consultation and create a personalized treatment plan combining the most effective modalities for your unique needs.",
    ],
  },
  "choosing-clinic": {
    title: "How to Choose the Right Clinic for Your Hair Transplant",
    excerpt: "Choosing the right clinic is the most important decision in your hair restoration journey. Here's what experts recommend looking for.",
    date: "Jan 5, 2025", category: "Guide", image: "/images/hero2.jpg", readTime: "6 min",
    content: [
      "Choosing the right clinic for your hair transplant is one of the most important decisions you'll make in your hair restoration journey. The difference between a great result and a disappointing one often comes down to the clinic you choose. With so many options available — especially with medical tourism growing rapidly — here's an expert guide to making the right choice.",
      "## 1. Verify Doctor Credentials and Experience\n\nThis is the single most important factor. Ensure your surgeon:\n- Is a licensed medical doctor (not just a technician performing the procedure)\n- Has specialized training in hair restoration surgery\n- Has significant experience (1,000+ procedures minimum)\n- Is a member of recognized professional organizations (ISHRS, ABHRS)\n- Can show you their own results, not stock photos\n- Will personally perform the critical parts of your procedure",
      "## 2. Review Before & After Photos Critically\n\nA reputable clinic will have an extensive gallery. Look for:\n- Patients with similar hair loss patterns to yours\n- Photos taken at the same angle and lighting (before vs. after)\n- Results showing the hairline from multiple angles\n- Photos at different stages (6 months, 12 months, 18 months)\n- Consistent quality across many patients (not just a few cherry-picked results)\n- High-resolution, unedited, unfiltered photos\n- Video testimonials are even more convincing than photos",
      "## 3. Understand the Technology & Techniques\n\nModern clinics should offer the latest evidence-based techniques:\n- **FUE (Follicular Unit Extraction)**: The current gold standard. Minimally invasive, no linear scar.\n- **DHI (Direct Hair Implantation)**: Uses Choi implanter pen for precise placement. Ideal for hairline work.\n- **Sapphire FUE**: Uses sapphire blades for channel opening, resulting in finer incisions and faster healing.\n- **Motorized vs Manual FUE**: Both have pros and cons; the surgeon's skill matters most.\n- **PRP Therapy**: Should be available as a complementary treatment.\n\n**Red flag**: Clinics that only offer one technique regardless of the patient's needs.",
      "## 4. Research Patient Reviews and Reputation\n\nDon't rely solely on the clinic's website. Check:\n- Google Reviews (look for detailed reviews, not just star ratings)\n- Independent platforms like Trustpilot and RealSelf\n- Patient forums and hair transplant communities\n- Social media comments and interactions\n- Ask for references — a confident clinic will connect you with previous patients\n\n**Red flags**: Deleting negative reviews, buying fake reviews, or no online presence at all.",
      "## 5. Evaluate the Facility and Standards\n\nThe facility should meet or exceed healthcare standards:\n- Modern, well-maintained equipment\n- Proper sterilization and hygiene protocols\n- Licensed operating facility\n- Emergency preparedness\n- Comfortable patient environment\n- Proper lighting and ventilation in the procedure room\n\nIf possible, visit the clinic beforehand or request a virtual tour. The best clinics are proud to show you their facilities.",
      "## 6. Beware of Red Flags\n\nWatch out for these warning signs:\n- Unrealistically low prices (quality has a cost)\n- Guarantees of specific results (no ethical doctor guarantees outcomes)\n- Pressure to book immediately with 'limited time' discounts\n- Technicians performing the entire procedure without surgeon involvement\n- Lack of before/after portfolio\n- No clear pricing — hidden fees revealed later\n- Celebrity endorsements as the main marketing tool\n- Assembly-line approach with multiple patients per day",
      "## Why Bestar Clinic Checks Every Box\n\nBestar Clinic has earned its reputation through consistent, excellent results:\n- **Expert Team**: Board-certified surgeons with 10+ years of specialized hair transplant experience\n- **Proven Track Record**: 15,000+ successful procedures with 95-98% graft survival rates\n- **Global Trust**: Patients from 40+ countries choose us\n- **Advanced Technology**: Latest FUE, DHI, and Sapphire techniques with 3D planning\n- **Complete Packages**: VIP packages for international patients including airport transfers, premium hotel accommodation, translator, and comprehensive aftercare\n- **Transparent Pricing**: All-inclusive quotes with no hidden fees\n- **Ongoing Support**: 24/7 WhatsApp support and scheduled follow-ups for 18 months",
    ],
  },
  "mesotherapy-skin": {
    title: "Mesotherapy: The Secret to Glowing, Hydrated Skin",
    excerpt: "Discover how mesotherapy delivers vitamins and nutrients directly to your skin for an unmatched glow from within.",
    date: "Dec 20, 2024", category: "Skin Care", image: "/images/before-after-skin-1.jpg", readTime: "5 min",
    content: [
      "If you've been searching for a treatment that delivers deep hydration, reduces fine lines, and gives your skin a luminous glow from within, mesotherapy might be the answer you've been looking for. This popular treatment has been a secret weapon of European skincare for decades and is now gaining worldwide recognition.",
      "## What Is Mesotherapy?\n\nMesotherapy involves the injection of customized cocktails of vitamins, minerals, amino acids, hyaluronic acid, and other beneficial substances directly into the mesoderm — the middle layer of the skin. Unlike topical products that struggle to penetrate the skin barrier, mesotherapy delivers active ingredients exactly where they're needed for maximum effect.",
      "## How Mesotherapy Works\n\nThe micro-injections create two beneficial effects:\n\n1. **Direct nutrient delivery**: The cocktail of ingredients nourishes skin cells from the inside, boosting collagen production, improving hydration at a cellular level, and promoting cell renewal.\n2. **Micro-stimulation**: The tiny punctures stimulate the skin's natural repair mechanisms, triggering collagen and elastin production similar to microneedling but with the added benefit of active ingredient delivery.",
      "## Benefits of Mesotherapy for Skin\n\n- Intense, deep hydration that lasts weeks\n- Visible skin radiance and luminosity\n- Reduced fine lines and improved skin elasticity\n- Even skin tone and reduced pigmentation\n- Tightened pores and refined texture\n- Improved blood circulation in the skin\n- Addresses dullness and tired-looking skin\n- Can be used on face, neck, décolletage, and hands",
      "## The Treatment Experience\n\nA typical mesotherapy session at Bestar Clinic:\n\n1. **Skin cleansing** and preparation\n2. **Topical numbing cream** applied for 15-20 minutes\n3. **Custom cocktail** prepared based on your skin's needs\n4. **Micro-injections** performed using ultra-fine needles or a mesotherapy gun\n5. **Soothing mask** applied post-treatment\n6. **Duration**: 30-45 minutes total\n\nMost patients describe the sensation as tiny pinpricks — very tolerable with numbing cream.",
      "## Treatment Protocol\n\n- **Initial course**: 4-6 sessions, 2 weeks apart\n- **Maintenance**: 1 session monthly\n- **Results**: Visible improvement after 2-3 sessions; optimal results after completing the full course\n- **Duration of results**: Each session's effects build cumulatively",
      "## Who Is Mesotherapy For?\n\nMesotherapy is ideal for:\n- Anyone wanting a radiant, hydrated complexion\n- Those with dull, dehydrated, or tired-looking skin\n- Smokers or city dwellers with pollution-stressed skin\n- Pre-event skin preparation (weddings, photoshoots)\n- Maintenance treatment alongside other anti-aging procedures\n- Those who want results without downtime\n\nBook a consultation at Bestar Clinic to discover how mesotherapy can transform your skin.",
    ],
  },
  "hair-loss-causes": {
    title: "Understanding Hair Loss: Causes, Types, and Modern Solutions",
    excerpt: "Hair loss affects millions worldwide. Learn about the different causes, how to identify your type, and the most effective modern treatments.",
    date: "Dec 10, 2024", category: "Hair Restoration", image: "/images/before-after-hair-1.jpg", readTime: "9 min",
    content: [
      "Hair loss is one of the most common cosmetic concerns worldwide, affecting an estimated 50% of men and 25% of women by age 50. While it's incredibly common, hair loss can have a significant impact on self-confidence and quality of life. The good news? Modern medicine offers more effective solutions than ever before. Understanding the cause of your hair loss is the first step toward finding the right solution.",
      "## Types of Hair Loss\n\n**Androgenetic Alopecia (Pattern Baldness)**\nThe most common type, accounting for 95% of male hair loss. Caused by genetic sensitivity to DHT (dihydrotestosterone), which miniaturizes hair follicles over time. In men, it typically follows the Norwood scale (receding hairline and crown thinning). In women, it causes diffuse thinning across the top (Ludwig scale).\n\n**Telogen Effluvium**\nTemporary, diffuse hair shedding triggered by stress, illness, surgery, medication changes, or nutritional deficiencies. The good news: it's usually reversible once the trigger is addressed.\n\n**Alopecia Areata**\nAn autoimmune condition causing patchy hair loss. The immune system mistakenly attacks hair follicles. Can range from small patches to complete hair loss.\n\n**Traction Alopecia**\nCaused by hairstyles that pull on hair (tight ponytails, braids, extensions). If caught early, it's reversible by changing hairstyling habits.",
      "## Common Causes\n\n- **Genetics**: The strongest factor. If your parents experienced hair loss, you're more likely to as well.\n- **Hormones**: DHT, thyroid imbalances, pregnancy, menopause, PCOS can all trigger hair loss.\n- **Nutritional deficiencies**: Iron, vitamin D, zinc, and protein deficiencies are linked to hair loss.\n- **Stress**: Physical or emotional stress can push follicles into the resting phase prematurely.\n- **Medical conditions**: Thyroid disease, autoimmune conditions, scalp infections.\n- **Medications**: Blood thinners, antidepressants, chemotherapy, and others can cause hair loss.\n- **Lifestyle**: Smoking, poor diet, lack of sleep, excessive heat styling.",
      "## When to See a Doctor\n\nConsult a hair loss specialist if you notice:\n- Sudden or rapid hair loss\n- Patchy bald spots\n- Hair coming out in clumps when washing\n- Noticeable thinning on top of the head\n- Receding hairline that's progressing\n- Family history of baldness and you're noticing early signs\n\nEarly intervention gives you the most treatment options and the best outcomes.",
      "## Modern Treatment Options\n\n**Medical Treatments:**\n- **Minoxidil (topical)**: FDA-approved treatment that stimulates hair growth. Available as liquid or foam. Must be used continuously.\n- **Finasteride (oral)**: Prescription medication that blocks DHT production. Highly effective for male pattern baldness.\n- **Low-Level Laser Therapy (LLLT)**: FDA-cleared devices that use red light to stimulate follicles.\n\n**Clinical Treatments:**\n- **PRP Therapy**: Your own platelet-rich plasma injected into the scalp to stimulate growth.\n- **Mesotherapy**: Vitamin cocktails injected into the scalp to nourish follicles.\n\n**Surgical Treatments:**\n- **FUE Hair Transplant**: Individual follicle extraction and implantation. Gold standard for permanent results.\n- **DHI Hair Transplant**: Direct implantation technique for precise hairline work.\n\n**Combination Approach:**\nThe most effective strategy often combines multiple treatments — for example, a hair transplant plus PRP plus finasteride for comprehensive, long-lasting results.",
      "## Hair Loss in Women\n\nFemale hair loss is more common than many realize and can be particularly distressing due to social expectations. Key differences:\n- Pattern is usually diffuse thinning rather than receding\n- Hormonal causes are more varied (pregnancy, menopause, PCOS)\n- Treatment approaches may differ (finasteride not typically used in women)\n- PRP and minoxidil are often first-line treatments\n- Hair transplant is an option for suitable candidates\n\nAt Bestar Clinic, we have extensive experience treating female hair loss with personalized approaches.",
      "## Prevention Tips\n\nWhile genetic hair loss can't be fully prevented, you can slow it down:\n- Start treatment early — the sooner the better\n- Eat a balanced diet rich in protein, iron, and vitamins\n- Manage stress through exercise, meditation, or therapy\n- Avoid harsh chemical treatments and excessive heat styling\n- Don't smoke — it restricts blood flow to follicles\n- Get regular scalp check-ups\n- Consider preventive PRP treatments if you have a family history",
    ],
  },
};

const blogDataAR: Record<string, BlogContent> = {
  "fue-hair-transplant-guide": {
    title: "كل ما تحتاج معرفته عن زراعة الشعر بتقنية FUE",
    excerpt: "تقنية FUE هي المعيار الذهبي لعمليات زراعة الشعر. تعرف على التقنية والتعافي وما يمكن توقعه في كل مرحلة.",
    date: "1 مارس 2025", category: "استعادة الشعر", image: "/images/service-hair.jpg", readTime: "8 دقائق",
    content: [
      "تقنية FUE (استخراج وحدة البصيلات) هي أحدث وأكثر تقنيات زراعة الشعر شيوعاً اليوم. على عكس طريقة الشريحة القديمة (FUT)، تقوم FUE باستخراج بصيلات الشعر الفردية من المنطقة المانحة باستخدام أدوات دقيقة، دون ترك ندبة خطية ومع فترة تعافي أسرع بكثير. أحدثت هذه التقنية ثورة في استعادة الشعر وأصبحت الطريقة المفضلة عالمياً.",
      "## كيف تعمل تقنية FUE؟\n\nتتضمن العملية استخراج وحدات البصيلات الفردية من الجزء الخلفي والجانبي من الرأس باستخدام أداة ثقب دقيقة (0.6-0.9 مم). ثم تُزرع هذه البصيلات بعناية في المناطق الخفيفة أو الصلعاء متبعة نمط النمو الطبيعي لشعرك.\n\nالميزة الرئيسية لـ FUE هي أن كل بصيلة تُستخرج بشكل فردي، مما ينتج ندوباً صغيرة جداً وغير مرئية تقريباً في المنطقة المانحة. هذا يعني أنك تستطيع قص شعرك قصيراً دون أي علامات مرئية للجراحة.",
      "## FUE مقابل DHI: ما الفرق؟\n\nكلتاهما تقنيتان متقدمتان لكنهما تختلفان في طريقة الزراعة:\n\n- **FUE**: تُفتح القنوات أولاً، ثم تُوضع البصيلات باستخدام ملقط\n- **DHI (الزراعة المباشرة)**: تستخدم قلم تشوي لفتح القناة ووضع البصيلة في نفس الوقت\n\nDHI تقدم دقة أعلى قليلاً لعمل خط الشعر، بينما FUE تسمح بمعالجة مناطق أكبر في جلسة واحدة. في بيستار كلينك، نستخدم كلتا التقنيتين ونوصي بالأفضل لكل مريض.",
      "## من هو المرشح المثالي؟\n\nالمرشحون المثاليون لزراعة الشعر بتقنية FUE:\n- الرجال والنساء الذين يعانون من تساقط الشعر الوراثي\n- المرضى ذوو كثافة شعر مانحة كافية (عادة >60 بصيلة/سم²)\n- الباحثون عن إجراء أقل تدخلاً بدون ندبة خطية\n- من يريدون قص شعرهم قصيراً بعد الجراحة\n- من استقر تساقط شعرهم (مثالياً مع الأدوية)\n- الأشخاص الأصحاء بدون حالات طبية غير مسيطر عليها",
      "## عملية FUE في بيستار كلينك\n\nفي بيستار كلينك، يتم إجراء عمليات FUE بأيدي جراحين ذوي خبرة باستخدام أحدث التقنيات:\n\n1. **الاستشارة والتخطيط ثلاثي الأبعاد**: نحلل نمط تساقط شعرك ونصمم خط شعر طبيعي باستخدام محاكاة ثلاثية الأبعاد. سترى النتائج المتوقعة قبل العملية.\n2. **الفحوصات**: فحوصات دم وتحليل فروة الرأس لضمان السلامة والتخطيط الأمثل.\n3. **استخراج البصيلات**: تُستخرج البصيلات تحت تخدير موضعي. ستكون مرتاحاً طوال الوقت.\n4. **فتح القنوات**: مواقع الاستقبال تُنشأ بزوايا دقيقة (40-45°) تطابق نمط نموك الطبيعي.\n5. **زراعة البصيلات**: توضع البصيلات بعناية لكثافة مثالية (40-60 بصيلة/سم²).\n6. **حقيبة الرعاية**: ستتلقى حقيبة رعاية كاملة مع الأدوية والشامبو الخاص والتعليمات.",
      "## جدول التعافي\n\n- **اليوم 1-3**: تورم واحمرار خفيف. نم مرتفعاً. تناول الأدوية الموصوفة.\n- **اليوم 3-5**: أول غسلة بتقنية خاصة. التورم يبدأ بالتراجع.\n- **الأسبوع 1**: قشور صغيرة حول البصيلات (طبيعي). عودة للعمل المكتبي.\n- **الأسبوع 2-3**: القشور تسقط. الشعر المزروع يبدأ بالتساقط (صدمة التساقط — طبيعي تماماً!).\n- **الشهر 3-4**: الشعر الجديد يبدأ بالنمو! ستلاحظ شعيرات رقيقة تظهر.\n- **الشهر 6-8**: تحسن كبير مرئي. الشعر يزداد سمكاً وطولاً.\n- **الشهر 12-18**: النتائج الكاملة مرئية بشعر كثيف وطبيعي.",
      "## نصائح الرعاية لأفضل النتائج\n\nاتباع الرعاية الصحيحة أمر حاسم لنجاح البصيلات:\n- نم مرتفعاً بزاوية 45° لأول 5 ليالي\n- لا تلمس أو تحك المنطقة المزروعة\n- تجنب أشعة الشمس المباشرة لـ 4 أسابيع — ارتدِ قبعة فضفاضة\n- لا سباحة أو ساونا أو تمارين مكثفة لـ 4 أسابيع\n- التزم بجدول الأدوية بدقة\n- تناول غذاء متوازن غني بالبروتين والفيتامينات\n- لا تدخن — يعيق تدفق الدم ونجاح البصيلات",
      "## لماذا تختار بيستار كلينك؟\n\nمع أكثر من 15,000 عملية ناجحة ومرضى من 40+ دولة، بيستار كلينك رائد في استعادة الشعر في المنطقة:\n- جراحون معتمدون بخبرة 10+ سنوات\n- أحدث تقنيات FUE و DHI بما في ذلك شفرات الياقوت\n- نسبة نجاح البصيلات 95-98%\n- باقات VIP شاملة للمرضى الدوليين\n- دعم ما بعد العملية على مدار الساعة\n- أسعار شفافة بدون رسوم مخفية",
    ],
  },
  "botox-vs-fillers": {
    title: "البوتكس مقابل الفيلر: أيهما مناسب لك؟",
    excerpt: "كلا العلاجين يجدد مظهرك لكنهما يعملان بطرق مختلفة جذرياً. إليك دليل شامل لمساعدتك في الاختيار.",
    date: "20 فبراير 2025", category: "تجميل", image: "/images/before-after-botox-1.jpg", readTime: "7 دقائق",
    content: [
      "البوتكس والفيلر هما أكثر علاجات التجميل غير الجراحية شيوعاً في العالم، مع ملايين العمليات سنوياً. رغم أن كليهما يهدف لتجديد مظهرك وتقليل علامات الشيخوخة، إلا أنهما يعملان بطرق مختلفة جذرياً ويناسبان مشاكل مختلفة.",
      "## ما هو البوتكس؟\n\nالبوتكس (توكسين البوتولينوم النوع A) هو معدل عصبي يُرخي عضلات الوجه المستهدفة مؤقتاً. بتقليل نشاط العضلات، ينعّم التجاعيد الحركية — تلك الناتجة عن الحركات المتكررة.\n\n**الأفضل لعلاج:**\n- خطوط الجبين الأفقية\n- تجاعيد حول العينين (قدم الغراب)\n- خطوط العبوس (بين الحاجبين)\n- التعرق المفرط\n- توتر الفك وصرير الأسنان",
      "## ما هو الفيلر؟\n\nالفيلر عبارة عن جل قابل للحقن — عادة من حمض الهيالورونيك — يضيف حجماً وهيكلاً للوجه. يملأ المناطق التي فقدت حجمها بسبب الشيخوخة.\n\n**الأفضل لعلاج:**\n- الطيات الأنفية الشفوية (خطوط الابتسامة)\n- حجم وتحديد الشفاه\n- استعادة حجم الخدين\n- تجويف تحت العين\n- تحديد خط الفك والذقن\n- تجديد اليدين",
      "## الفروقات الرئيسية\n\n- **الآلية**: البوتكس يرخي العضلات؛ الفيلر يضيف حجماً\n- **ظهور النتائج**: البوتكس يحتاج 3-7 أيام؛ الفيلر فوري\n- **المدة**: البوتكس 3-6 أشهر؛ الفيلر 6-18 شهراً\n- **وقت العلاج**: البوتكس 10-15 دقيقة؛ الفيلر 15-45 دقيقة\n- **الإمكانية للعكس**: البوتكس يتلاشى طبيعياً؛ فيلر HA يمكن إذابته",
      "## 'شد الوجه السائل': الجمع بين الاثنين\n\nكثير من المرضى يحققون أفضل النتائج بالجمع بين البوتكس والفيلر فيما يُسمى 'شد الوجه السائل'. هذا النهج يعالج التجاعيد الحركية (بالبوتكس) وفقدان الحجم (بالفيلر) لتجديد شامل للوجه.\n\nعلاج مركب نموذجي قد يشمل:\n- بوتكس للجبين وحول العينين\n- فيلر للخدين\n- فيلر خفيف للشفاه\n- فيلر لخط الفك\n\nهذا المزيج يمكن أن يُزيل 5-10 سنوات من مظهرك بدون جراحة.",
      "## اختيار العلاج المناسب\n\nخلال استشارتك في بيستار كلينك، سيقوم أطباؤنا ذوو الخبرة بـ:\n- تحليل تشريح وجهك وبنية العظام\n- تقييم جودة بشرتك ومرونتها\n- فهم أهدافك الجمالية ومخاوفك\n- التوصية بخطة علاج مخصصة\n- عرض صور قبل/بعد لمرضى مشابهين",
      "## السلامة في بيستار كلينك\n\nجميع علاجات الحقن لدينا تُجرى بأيدي أطباء معتمدين باستخدام منتجات معتمدة من FDA فقط. نركز على:\n- نتائج طبيعية تعزز ملامحك\n- نهج محافظ — يمكننا دائماً إضافة المزيد لاحقاً\n- مراجعة شاملة للتاريخ الطبي\n- تقنية معقمة وبروتوكولات صحيحة",
    ],
  },
  "recovery-tips": {
    title: "5 نصائح أساسية للتعافي السريع بعد زراعة الشعر",
    excerpt: "اتبع هذه النصائح الموصى بها من الخبراء لضمان أفضل النتائج وأسرع تعافي بعد عملية زراعة الشعر.",
    date: "10 فبراير 2025", category: "التعافي", image: "/images/before-after-hair-1.jpg", readTime: "6 دقائق",
    content: [
      "زراعة الشعر الناجحة لا تنتهي في غرفة العمليات. طريقة رعايتك لفروة رأسك في الأسابيع التالية تلعب دوراً حاسماً في نجاح البصيلات وتحقيق أفضل النتائج الممكنة.",
      "## النصيحة 1: اتبع تعليمات طبيبك بدقة\n\nسيقدم لك جراحك تعليمات رعاية مفصلة:\n- جداول الأدوية (مضادات حيوية، مضاد التهاب، مسكن)\n- إرشادات وضعية النوم (مرتفع بزاوية 45° لـ 5 ليالٍ)\n- متى تستأنف الأنشطة اليومية\n- تعليمات غسل الشعر وجدوله\n- المنتجات التي يجب استخدامها وتجنبها",
      "## النصيحة 2: أتقن فن النوم المرتفع\n\nلأول 5-7 ليالٍ بعد الجراحة، نم مرتفعاً بزاوية 45 درجة. هذا يقلل التورم بشكل كبير ويحمي البصيلات المزروعة.\n\n**نصائح عملية:**\n- استخدم 2-3 وسائد مكدسة أو وسادة سفر\n- فكر في النوم على كرسي مائل لأول ليالٍ\n- استخدم وسادة رقبة على شكل U لمنع التقلب\n- ضع منشفة نظيفة على وسادتك كل ليلة",
      "## النصيحة 3: احمِ فروة رأسك من العوامل الخارجية\n\nالبصيلات المزروعة حساسة في الأسابيع الأولى:\n\n- **الشمس**: الأشعة فوق البنفسجية تضر البشرة والبصيلات. ارتدِ قبعة فضفاضة لـ 4-6 أسابيع.\n- **المطر**: يمكن أن يحمل ملوثات. غطِ رأسك إذا فاجأك المطر.\n- **الرياح والغبار**: تجنب البيئات المغبرة لأسبوعين.\n- **البرد**: البرد الشديد يقلل تدفق الدم لفروة الرأس.",
      "## النصيحة 4: كن صبوراً مع مرحلة التساقط\n\nهذه ربما أهم نصيحة: **الشعر المزروع سيتساقط في الأسبوع 2-4.** هذا يُسمى 'صدمة التساقط' وهو جزء طبيعي ومتوقع تماماً.\n\nما يحدث: ساق الشعر المزروع يتساقط، لكن جذر البصيلة الحية يبقى مزروعاً بأمان تحت الجلد. شعر جديد ودائم سيبدأ بالنمو من هذه البصيلات خلال 3-4 أشهر.\n\nلا تقلق! ثق بالعملية — كل مريض حقق نتائج مذهلة مر بنفس مرحلة التساقط.",
      "## النصيحة 5: غذِّ تعافيك بتغذية صحيحة\n\nما تأكله يؤثر مباشرة على نمو الشعر ونجاح البصيلات:\n\n- **البروتين**: ضروري لنمو الشعر. اللحوم الخالية، السمك، البيض، البقوليات\n- **الحديد**: ينقل الأكسجين للبصيلات. اللحم الأحمر، السبانخ، العدس\n- **الزنك**: يدعم نمو أنسجة الشعر. المكسرات، البذور، الحبوب الكاملة\n- **البيوتين**: يقوي الشعر. البيض، الأفوكادو، السلمون\n- **فيتامين D**: يحفز البصيلات. أشعة الشمس، الأسماك الدهنية\n- **الماء**: حافظ على ترطيبك (2-3 لتر يومياً)\n\n**تجنب**: التدخين، الكحول المفرط، الأطعمة المصنعة",
      "## برنامج دعم بيستار كلينك بعد العملية\n\nفي بيستار كلينك، لا نجري العملية فقط. دعمنا الشامل يشمل:\n- حقيبة رعاية مفصلة مع جميع المنتجات اللازمة\n- خط دعم واتساب متاح 24/7\n- فحوصات متابعة مجدولة\n- تتبع تقدمك بالصور\n- جلسات PRP لتعزيز نجاح البصيلات",
    ],
  },
  "prp-science": {
    title: "العلم وراء علاج PRP للشعر: كيف يُنمي دمك شعرك",
    excerpt: "علاج البلازما الغنية بالصفائح الدموية يحدث ثورة في علاج تساقط الشعر. اكتشف العلم والأبحاث والنتائج الحقيقية.",
    date: "25 يناير 2025", category: "استعادة الشعر", image: "/images/before-after-beard-1.jpg", readTime: "7 دقائق",
    content: [
      "علاج البلازما الغنية بالصفائح الدموية (PRP) هو أحد أكثر التطورات إثارة في علاج تساقط الشعر. يستخدم هذا العلاج الطبيعي آليات الشفاء الخاصة بجسمك لتحفيز نمو الشعر وتحسين كثافته وإبطاء التساقط.",
      "## ما هو PRP؟\n\nPRP هو تركيز من الصفائح الدموية المأخوذة من دمك. بينما نفكر عادة في الصفائح الدموية كخلايا تساعد في التجلط، فإنها تحتوي على مئات البروتينات المسماة عوامل النمو التي تلعب أدواراً حاسمة في شفاء وتجديد الأنسجة.\n\nعندما نركز هذه الصفائح (3-5 أضعاف المستوى الطبيعي)، ننشئ سيروم تجديدي قوي يمكنه إعادة تنشيط بصيلات الشعر الخاملة.",
      "## لماذا PRP يعمل للشعر؟\n\nأظهرت دراسات متعددة أن PRP يعمل من خلال آليات بيولوجية:\n\n- **زيادة التروية الدموية**: يعزز تكوين أوعية دموية جديدة حول البصيلات\n- **تنشيط الخلايا الجذعية**: عوامل النمو تنشط الخلايا الجذعية في البصيلات\n- **إطالة مرحلة النمو**: يُطيل مرحلة النمو النشط للشعر\n- **تقليل الالتهاب**: يخلق بيئة فروة رأس أصح\n- **إنتاج الكولاجين**: يحفز الكولاجين حول البصيلات",
      "## الأدلة السريرية\n\nأبحاث منشورة أظهرت:\n- زيادة 30-40% في عدد الشعر\n- تحسن ملحوظ في كثافة وقطر الشعر\n- تقليل تساقط الشعر في 80% من المرضى\n- نتائج معززة عند الدمج مع علاجات أخرى",
      "## إجراء PRP خطوة بخطوة\n\n1. **سحب الدم**: كمية صغيرة (20-30 مل) من ذراعك\n2. **الطرد المركزي المزدوج**: معالجة الدم لتركيز الصفائح (3-5 أضعاف)\n3. **التنشيط**: تنشيط البلازما لإطلاق عوامل النمو\n4. **الحقن الدقيق**: حقن البلازما في مناطق فروة الرأس المستهدفة بإبر رفيعة\n5. **المدة**: 30-45 دقيقة كاملة",
      "## بروتوكول العلاج\n\n- **المرحلة الأولى**: 3-4 جلسات بفارق 4 أسابيع\n- **التعزيز**: جلستان بفارق شهرين\n- **الصيانة**: جلسة كل 4-6 أشهر\n- **الجدول الزمني**: تحسن مرئي بعد 2-3 جلسات، أقصى نتائج عند 6-9 أشهر",
      "## PRP + زراعة الشعر: مزيج قوي\n\nPRP مكمل ممتاز لجراحة زراعة الشعر:\n- يحسن نسبة نجاح البصيلات بـ 15-20%\n- يسرع شفاء المناطق المانحة والمستقبلة\n- يعزز كثافة الشعر المزروع\n- يقوي الشعر الطبيعي المحيط",
      "## هل PRP مناسب لك؟\n\nPRP يعمل أفضل مع:\n- ترقق الشعر المبكر إلى المتوسط\n- الرجال والنساء\n- من يريدون تكميل العلاجات الطبية\n- مرضى ما بعد الزراعة\n- من يفضلون نهجاً طبيعياً غير جراحي\n\nاحجز استشارة مجانية في بيستار كلينك لتقييم شخصي.",
    ],
  },
  "skin-rejuvenation-options": {
    title: "تجديد البشرة: دليل شامل لخياراتك",
    excerpt: "من التقشير الكيميائي إلى علاجات الليزر، استكشف النطاق الكامل لخيارات تجديد البشرة المتاحة في بيستار كلينك.",
    date: "15 يناير 2025", category: "العناية بالبشرة", image: "/images/before-after-skin-1.jpg", readTime: "7 دقائق",
    content: [
      "تحقيق بشرة شابة ومشرقة أصبح أسهل من أي وقت مضى مع العلاجات الجلدية المتقدمة اليوم. سواء كنت تعاني من خطوط دقيقة أو أضرار الشمس أو ملمس غير متساوٍ أو ندوب حب الشباب أو بهتان عام، هناك حل مثبت علمياً لك.",
      "## التقشير الكيميائي\n\nالتقشير الكيميائي يستخدم محاليل حمضية لإزالة طبقات البشرة التالفة وكشف بشرة جديدة أنعم:\n\n- **التقشير السطحي** (حمض الجليكوليك، اللاكتيك): لمشاكل الملمس الخفيفة والبهتان. بدون فترة توقف.\n- **التقشير المتوسط** (TCA): يستهدف الخطوط الدقيقة والتصبغات. 3-5 أيام تقشر.\n- **التقشير العميق** (الفينول): للتجاعيد الكبيرة والندوب العميقة. نتائج ملحوظة.",
      "## الميكرونيدلينج\n\nالميكرونيدلينج ينشئ آلاف القنوات الدقيقة في البشرة، مما يحفز استجابة الشفاء الطبيعية وإنتاج الكولاجين والإيلاستين.\n\n**الفوائد:**\n- تقليل حجم المسام وتنقية ملمس البشرة\n- تحسين مظهر ندوب حب الشباب وعلامات التمدد\n- تحسين امتصاص السيروم (أفضل بـ 300%)\n- مناسب لجميع أنواع البشرة\n\nفي بيستار كلينك، ندمج الميكرونيدلينج مع PRP للحصول على نتائج فائقة.",
      "## الليزر لتجديد البشرة\n\nعلاجات الليزر تستخدم طاقة ضوئية مركزة لإزالة البشرة التالفة:\n\n- **ليزر CO2 الجزئي**: المعيار الذهبي للتجاعيد العميقة وندوب حب الشباب وشد البشرة\n- **ليزر Nd:YAG**: آمن لجميع أنواع البشرة بما فيها الداكنة. للتصبغات والمشاكل الوعائية\n- **IPL (الضوء النبضي المكثف)**: لأضرار الشمس والاحمرار وبقع العمر\n- **ليزر الإربيوم**: لتقشير سطحي دقيق مع تعافي أقصر",
      "## الهيدرافيشيل\n\nعلاج متعدد الخطوات ينظف ويقشر ويستخرج الشوائب ويرطب البشرة بتقنية خاصة. نتائج فورية بدون فترة توقف.\n\nمثالي كعلاج صيانة شهري أو تنعيش سريع قبل المناسبات الخاصة.",
      "## الميزوثيرابي\n\nالميزوثيرابي يتضمن حقن كوكتيلات من الفيتامينات والمعادن والأحماض الأمينية وحمض الهيالورونيك مباشرة في الطبقة الوسطى من البشرة:\n- ترطيب مكثف من الداخل\n- إشراق وتوهج محسّن\n- تقليل الخطوط الدقيقة\n- تحسين مرونة البشرة",
      "## اختيار العلاج المناسب لك\n\nأفضل علاج يعتمد على عدة عوامل:\n- **مخاوفك**: تجاعيد؟ تصبغات؟ ملمس؟ ندوب؟\n- **نوع بشرتك**: بعض العلاجات تعمل بشكل مختلف على أنواع البشرة المختلفة\n- **نمط حياتك**: هل يمكنك تحمل فترة توقف أم تحتاج خيارات بدون توقف؟\n- **عمرك**: رعاية وقائية (20-30) مقابل علاجات تصحيحية (40+)\n\nأطباء الجلدية لدينا سيقيّمون بشرتك خلال استشارة مجانية ويضعون خطة علاج مخصصة.",
    ],
  },
  "choosing-clinic": {
    title: "كيف تختار العيادة المناسبة لزراعة الشعر",
    excerpt: "اختيار العيادة المناسبة هو أهم قرار في رحلة استعادة شعرك. إليك ما يوصي به الخبراء.",
    date: "5 يناير 2025", category: "دليل", image: "/images/clinic-interior.jpg", readTime: "6 دقائق",
    content: [
      "اختيار العيادة المناسبة لزراعة الشعر هو أحد أهم القرارات في رحلة استعادة شعرك. الفرق بين نتيجة رائعة ومخيبة غالباً يعود للعيادة التي تختارها.",
      "## 1. تحقق من مؤهلات الطبيب وخبرته\n\nهذا أهم عامل. تأكد أن جراحك:\n- طبيب مرخص (ليس فقط فني)\n- لديه تدريب متخصص في جراحة استعادة الشعر\n- لديه خبرة كبيرة (1,000+ عملية كحد أدنى)\n- عضو في منظمات مهنية معترفة\n- يمكنه عرض نتائجه الخاصة\n- سيجري الأجزاء الحرجة من عمليتك شخصياً",
      "## 2. راجع صور قبل وبعد بعناية\n\nالعيادة الموثوقة ستمتلك معرض صور واسع:\n- مرضى بأنماط تساقط مشابهة لك\n- صور بنفس الزاوية والإضاءة\n- نتائج من زوايا متعددة\n- صور في مراحل مختلفة (6 أشهر، 12 شهراً، 18 شهراً)\n- جودة متسقة عبر مرضى كثيرين\n- صور عالية الدقة غير معدلة",
      "## 3. افهم التقنيات المستخدمة\n\nالعيادات الحديثة يجب أن تقدم أحدث التقنيات:\n- **FUE**: المعيار الذهبي الحالي. أقل تدخلاً.\n- **DHI**: تقنية الزراعة المباشرة بقلم تشوي.\n- **Sapphire FUE**: شفرات ياقوتية لشقوق أدق وشفاء أسرع.\n- **علاج PRP**: يجب أن يكون متاحاً كعلاج مكمل.\n\n**علامة تحذيرية**: العيادات التي تقدم تقنية واحدة فقط بغض النظر عن حاجة المريض.",
      "## 4. ابحث عن تقييمات المرضى\n\nلا تعتمد على موقع العيادة فقط:\n- تقييمات جوجل (ابحث عن تقييمات مفصلة)\n- منصات مستقلة مثل Trustpilot\n- منتديات ومجتمعات زراعة الشعر\n- تعليقات وسائل التواصل الاجتماعي\n\n**علامات تحذيرية**: حذف التقييمات السلبية، شراء تقييمات مزيفة.",
      "## 5. قيّم المنشأة والمعايير\n\nالمنشأة يجب أن تلبي معايير الرعاية الصحية:\n- معدات حديثة وصيانة جيدة\n- بروتوكولات تعقيم ونظافة صحيحة\n- منشأة عمليات مرخصة\n- بيئة مريحة للمرضى",
      "## 6. احذر من العلامات التحذيرية\n\nانتبه لهذه الإشارات:\n- أسعار منخفضة بشكل غير واقعي\n- ضمانات لنتائج محددة\n- ضغط للحجز فوراً بخصومات 'محدودة'\n- فنيون يجرون العملية بالكامل بدون جراح\n- عدم وجود معرض صور قبل/بعد\n- أسعار غير واضحة — رسوم مخفية\n- نهج خط إنتاج مع مرضى متعددين يومياً",
      "## لماذا بيستار كلينك هي الاختيار الصحيح\n\n- **فريق خبير**: جراحون معتمدون بخبرة 10+ سنوات\n- **سجل مثبت**: 15,000+ عملية ناجحة بنسبة نجاح 95-98%\n- **ثقة عالمية**: مرضى من 40+ دولة\n- **تقنيات متقدمة**: FUE و DHI و Sapphire مع تخطيط ثلاثي الأبعاد\n- **باقات شاملة**: VIP للمرضى الدوليين\n- **أسعار شفافة**: بدون رسوم مخفية\n- **دعم مستمر**: واتساب 24/7 ومتابعة لـ 18 شهراً",
    ],
  },
  "mesotherapy-skin": {
    title: "الميزوثيرابي: سر البشرة المتوهجة والمرطبة",
    excerpt: "اكتشف كيف يوصل الميزوثيرابي الفيتامينات والعناصر الغذائية مباشرة لبشرتك لتوهج لا مثيل له من الداخل.",
    date: "20 ديسمبر 2024", category: "العناية بالبشرة", image: "/images/before-after-skin-1.jpg", readTime: "5 دقائق",
    content: [
      "إذا كنت تبحث عن علاج يقدم ترطيباً عميقاً ويقلل الخطوط الدقيقة ويمنح بشرتك توهجاً من الداخل، فقد يكون الميزوثيرابي هو الجواب.",
      "## ما هو الميزوثيرابي؟\n\nالميزوثيرابي يتضمن حقن كوكتيلات مخصصة من الفيتامينات والمعادن والأحماض الأمينية وحمض الهيالورونيك مباشرة في الطبقة الوسطى من البشرة. على عكس المنتجات الموضعية التي تكافح لاختراق حاجز البشرة، الميزوثيرابي يوصل المكونات الفعالة بالضبط حيث تُحتاج.",
      "## كيف يعمل الميزوثيرابي\n\nالحقنات الدقيقة تخلق تأثيرين:\n\n1. **توصيل مباشر للعناصر الغذائية**: يغذي خلايا البشرة من الداخل ويعزز إنتاج الكولاجين ويحسن الترطيب على المستوى الخلوي.\n2. **التحفيز الدقيق**: الثقوب الصغيرة تحفز آليات الإصلاح الطبيعية للبشرة.",
      "## فوائد الميزوثيرابي\n\n- ترطيب عميق ومكثف يدوم أسابيع\n- إشراق وتوهج مرئي للبشرة\n- تقليل الخطوط الدقيقة وتحسين المرونة\n- توحيد لون البشرة وتقليل التصبغات\n- تقليل حجم المسام وتنقية الملمس\n- يمكن استخدامه على الوجه والرقبة والصدر واليدين",
      "## تجربة العلاج\n\nجلسة ميزوثيرابي نموذجية:\n\n1. **تنظيف البشرة** والتحضير\n2. **كريم تخدير** يُطبق لـ 15-20 دقيقة\n3. **كوكتيل مخصص** يُحضر حسب احتياجات بشرتك\n4. **حقنات دقيقة** بإبر رفيعة جداً\n5. **قناع مهدئ** يُطبق بعد العلاج\n6. **المدة**: 30-45 دقيقة",
      "## بروتوكول العلاج\n\n- **الدورة الأولى**: 4-6 جلسات بفارق أسبوعين\n- **الصيانة**: جلسة شهرية\n- **النتائج**: تحسن مرئي بعد 2-3 جلسات\n- **مدة النتائج**: تأثير كل جلسة يتراكم",
      "## لمن الميزوثيرابي مناسب؟\n\nالميزوثيرابي مثالي لـ:\n- أي شخص يريد بشرة مشرقة ومرطبة\n- أصحاب البشرة الباهتة والمجففة والمرهقة\n- المدخنين أو سكان المدن ذوي البشرة المتأثرة بالتلوث\n- تحضير البشرة للمناسبات\n- علاج صيانة بجانب إجراءات مضادة للشيخوخة\n\nاحجز استشارة في بيستار كلينك لتكتشف كيف يمكن للميزوثيرابي أن يحول بشرتك.",
    ],
  },
  "hair-loss-causes": {
    title: "فهم تساقط الشعر: الأسباب والأنواع والحلول الحديثة",
    excerpt: "تساقط الشعر يؤثر على الملايين. تعرف على الأسباب المختلفة وكيف تحدد نوعك وأكثر العلاجات الحديثة فعالية.",
    date: "10 ديسمبر 2024", category: "استعادة الشعر", image: "/images/before-after-hair-1.jpg", readTime: "9 دقائق",
    content: [
      "تساقط الشعر من أكثر المشاكل التجميلية شيوعاً عالمياً، يؤثر على حوالي 50% من الرجال و25% من النساء بحلول سن الخمسين. رغم شيوعه، يمكن أن يؤثر بشكل كبير على الثقة بالنفس. الخبر الجيد؟ الطب الحديث يقدم حلولاً أكثر فعالية من أي وقت مضى.",
      "## أنواع تساقط الشعر\n\n**الصلع الوراثي (الأندروجيني)**\nالأكثر شيوعاً، يمثل 95% من تساقط شعر الرجال. ناتج عن حساسية وراثية لهرمون DHT الذي يُصغّر بصيلات الشعر تدريجياً.\n\n**التساقط الكربي**\nتساقط مؤقت ومنتشر ناتج عن التوتر أو المرض أو الجراحة أو نقص التغذية. عادة قابل للعكس.\n\n**الثعلبة البقعية**\nحالة مناعة ذاتية تسبب تساقط بقعي. الجهاز المناعي يهاجم البصيلات خطأً.\n\n**ثعلبة الشد**\nناتجة عن تسريحات تشد الشعر. إذا اكتُشفت مبكراً فهي قابلة للعكس.",
      "## الأسباب الشائعة\n\n- **الوراثة**: أقوى عامل\n- **الهرمونات**: DHT، اضطرابات الغدة الدرقية، الحمل، سن اليأس\n- **نقص التغذية**: نقص الحديد وفيتامين D والزنك والبروتين\n- **التوتر**: الإجهاد الجسدي أو النفسي\n- **الحالات الطبية**: أمراض الغدة الدرقية، حالات المناعة الذاتية\n- **الأدوية**: مميعات الدم، مضادات الاكتئاب، الكيماوي\n- **نمط الحياة**: التدخين، النظام الغذائي السيئ، قلة النوم",
      "## متى تراجع الطبيب\n\nاستشر متخصصاً إذا لاحظت:\n- تساقط مفاجئ أو سريع\n- بقع صلعاء\n- شعر يتساقط بكتل عند الغسل\n- ترقق ملحوظ في أعلى الرأس\n- خط شعر متراجع يتقدم\n- تاريخ عائلي مع الصلع وأنت تلاحظ علامات مبكرة",
      "## خيارات العلاج الحديثة\n\n**العلاجات الدوائية:**\n- **مينوكسيديل (موضعي)**: معتمد من FDA لتحفيز نمو الشعر\n- **فيناسترايد (فموي)**: يحجب إنتاج DHT. فعال جداً للصلع الوراثي\n- **العلاج بالليزر منخفض المستوى**: أجهزة تستخدم الضوء الأحمر لتحفيز البصيلات\n\n**العلاجات السريرية:**\n- **علاج PRP**: بلازما غنية بالصفائح تُحقن في فروة الرأس\n- **الميزوثيرابي**: كوكتيلات فيتامينات تُحقن لتغذية البصيلات\n\n**العلاجات الجراحية:**\n- **زراعة الشعر FUE**: استخراج وزراعة البصيلات الفردية\n- **زراعة الشعر DHI**: تقنية الزراعة المباشرة لدقة أعلى",
      "## تساقط الشعر عند النساء\n\nتساقط شعر النساء أكثر شيوعاً مما يدركه كثيرون:\n- النمط عادة ترقق منتشر وليس تراجعاً\n- الأسباب الهرمونية أكثر تنوعاً\n- PRP والمينوكسيديل غالباً الخطوط العلاجية الأولى\n- زراعة الشعر خيار للمرشحات المناسبات\n\nفي بيستار كلينك، لدينا خبرة واسعة في علاج تساقط شعر النساء بنهج مخصص.",
      "## نصائح الوقاية\n\nرغم عدم إمكانية منع التساقط الوراثي تماماً، يمكنك إبطاؤه:\n- ابدأ العلاج مبكراً\n- تناول غذاءً متوازناً غنياً بالبروتين والحديد والفيتامينات\n- أدر التوتر بالتمارين والتأمل\n- تجنب العلاجات الكيميائية القاسية والحرارة المفرطة\n- لا تدخن\n- احصل على فحوصات فروة رأس منتظمة\n- فكر في جلسات PRP وقائية إذا كان لديك تاريخ عائلي",
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const dataMap = lang === "ar" ? blogDataAR : blogDataEN;
  const post = slug ? dataMap[slug] : null;

  if (!post) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            {lang === "ar" ? "المقال غير موجود" : "Article Not Found"}
          </h1>
          <Button asChild>
            <Link to="/blog">← {t("blog.viewAll")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const renderContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## ")) {
        return <h2 key={i} className="text-2xl font-display font-bold text-foreground mt-10 mb-4">{line.replace("## ", "")}</h2>;
      }
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) return <li key={i} className="ms-6 mb-2 text-muted-foreground"><strong className="text-foreground">{match[1]}</strong>{match[2] ? `: ${match[2]}` : ""}</li>;
      }
      if (line.startsWith("- ")) {
        return <li key={i} className="ms-6 mb-2 text-muted-foreground">{line.replace("- ", "")}</li>;
      }
      if (/^\d+\.\s\*\*/.test(line)) {
        const match = line.match(/^\d+\.\s\*\*(.+?)\*\*:?\s*(.*)/);
        if (match) return <li key={i} className="ms-6 mb-3 text-muted-foreground list-decimal"><strong className="text-foreground">{match[1]}</strong>{match[2] ? `: ${match[2]}` : ""}</li>;
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      if (line.startsWith("|")) return null;
      return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{line}</p>;
    });
  };

  return (
    <div className="pt-[72px]">
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">{post.category}</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground max-w-3xl leading-tight">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-10">
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                {t("blog.viewAll")}
              </Link>

              <div className="prose-custom">
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-medium border-s-4 border-primary ps-4">
                  {post.excerpt}
                </p>
                {post.content.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                  >
                    {renderContent(section)}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-16 p-8 rounded-2xl bg-card border border-border text-center"
              >
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{t("sd.readyToStart")}</h3>
                <p className="text-muted-foreground mb-6">{t("sd.bookConsultation")}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild className="bg-gradient-blue hover:opacity-90 text-primary-foreground rounded-xl px-7">
                    <Link to="/book-appointment">{t("nav.bookAppointment")}</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 rounded-xl px-7">
                    <Link to="/consultation">{t("hero.consultBtn")}</Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
