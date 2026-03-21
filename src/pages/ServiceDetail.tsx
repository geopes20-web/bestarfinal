import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarDays, Stethoscope, CheckCircle2, Clock, Shield, ArrowLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/contexts/I18nContext";

type ServiceContent = {
  title: string; tagline: string; description: string; benefits: string[];
  idealCandidate: string[]; steps: { title: string; desc: string }[];
  recovery: string; results: string; risks: string; pricing: string;
  faqs: { q: string; a: string }[]; image: string;
};

const serviceDataEN: Record<string, ServiceContent> = {
  "hair-transplant": {
    title: "Hair Transplant", tagline: "Natural, permanent hair restoration",
    description: "Our hair transplant procedures use the latest FUE (Follicular Unit Extraction) and DHI (Direct Hair Implantation) techniques to deliver natural-looking, permanent results. Each procedure is meticulously planned using advanced 3D imaging to ensure optimal density and hairline design. We perform over 2,000 hair transplant procedures annually, making Bestar Clinic one of the most experienced centers in the region.",
    benefits: ["Permanent, natural-looking results", "Minimal scarring with FUE technique", "Quick recovery time (3-5 days)", "No stitches required", "Local anesthesia — painless procedure", "Custom-designed hairline using 3D simulation", "95-98% graft survival rate", "Suitable for both men and women"],
    idealCandidate: ["Men and women with pattern baldness (Norwood 2-7)", "Those with receding hairlines", "People with thinning hair on crown or temples", "Those seeking a permanent solution to hair loss", "Healthy individuals with sufficient donor hair density", "Patients who have tried medical treatments without success"],
    steps: [
      { title: "Consultation & 3D Planning", desc: "Detailed scalp analysis using dermoscopy, hairline design consultation, and 3D simulation of expected results. We photograph your scalp from all angles and create a personalized treatment plan." },
      { title: "Blood Tests & Preparation", desc: "Routine blood tests to ensure safety. The donor and recipient areas are marked. Local anesthesia is applied for a completely painless experience." },
      { title: "Follicle Extraction (FUE)", desc: "Individual follicles are carefully extracted from the donor area using micro-punches (0.6-0.9mm). This leaves no linear scar and heals within days." },
      { title: "Channel Opening", desc: "Recipient sites are created at precise angles (40-45°) and depths matching your natural hair growth pattern for maximum naturalness." },
      { title: "Graft Implantation", desc: "Follicles are implanted one by one into the prepared channels. Our team ensures optimal density (40-60 grafts/cm²) for thick, natural coverage." },
      { title: "Post-Op Care & Follow-Up", desc: "Detailed aftercare kit provided including medications, special shampoo, and spray. Follow-up appointments at day 3, week 1, month 1, and month 6." },
    ],
    recovery: "Most patients return to normal activities within 3-5 days. The donor area heals within 7-10 days. Initial shedding of transplanted hair occurs at 2-4 weeks (this is completely normal). New growth becomes visible from month 3, with significant improvement by month 6. Full final results are seen at 12-18 months post-procedure.",
    results: "95-98% graft survival rate. Permanent, natural-looking hair that grows continuously. You can cut, style, color, and treat it just like your natural hair. Most patients achieve 60-80% density increase in the treated area.",
    risks: "Minimal risks include temporary swelling (2-3 days), redness in donor/recipient areas (5-7 days), and temporary numbness. Infection risk is extremely low (<0.1%) due to our strict sterilization protocols. Our experienced team of surgeons ensures the highest safety standards throughout the procedure.",
    pricing: "Starting from $2,500 depending on the number of grafts required. Packages available including accommodation and airport transfers for international patients.",
    faqs: [
      { q: "How long does the procedure take?", a: "Typically 6-8 hours for 3,000-4,000 grafts. Larger sessions may be split across two days for patient comfort." },
      { q: "Is the procedure painful?", a: "No. Local anesthesia ensures you feel no pain. Most patients watch movies or sleep during the procedure." },
      { q: "When will I see final results?", a: "New growth begins at 3-4 months. You'll see significant improvement by month 6-8. Full results are visible at 12-18 months." },
      { q: "How many grafts do I need?", a: "This depends on your hair loss pattern. During consultation, we'll determine the exact number (typically 2,000-5,000 grafts)." },
      { q: "Will anyone know I had a transplant?", a: "No. Our technique creates results so natural that even hairdressers can't tell. We design hairlines that match your age and facial structure." },
      { q: "Can I fly after the procedure?", a: "Yes, you can fly 2-3 days after surgery. We provide all necessary aftercare supplies for your journey." },
    ],
    image: "/images/service-hair.jpg",
  },
  "beard-transplant": {
    title: "Beard Transplant", tagline: "Full, natural-looking beard restoration",
    description: "Our beard transplant procedure uses the advanced FUE technique to transplant hair follicles from the scalp to the beard area, creating a full, natural beard that perfectly matches your facial structure and desired style. Whether you have patchy growth, scarring, or simply cannot grow facial hair, we can help you achieve the beard you've always wanted.",
    benefits: ["Natural-looking fullness and density", "Permanent, lifelong results", "Custom beard design tailored to your face", "Fills patchy areas seamlessly", "Minimal scarring — virtually invisible", "Can cover scars from burns or injuries", "Grow, shave, and style like natural beard"],
    idealCandidate: ["Men with patchy or thin beards", "Those genetically unable to grow facial hair", "Men wanting to cover facial scars", "Those desiring a fuller, more defined beard", "Men who want a specific beard style but lack density"],
    steps: [
      { title: "Beard Design Consultation", desc: "We work together to design your ideal beard shape, considering your facial structure, jawline, and personal style preferences." },
      { title: "Donor Area Preparation", desc: "Hair follicles are selected from the scalp (usually the back of the head) to match beard hair characteristics." },
      { title: "Follicle Extraction", desc: "Individual follicles extracted using micro-FUE technique for minimal scarring in the donor area." },
      { title: "Precise Implantation", desc: "Follicles are placed at natural beard growth angles (acute 10-20°) to ensure authentic direction and natural look." },
      { title: "Aftercare Protocol", desc: "Detailed post-procedure care instructions provided. The beard area is protected with a special dressing for the first night." },
    ],
    recovery: "Return to work in 2-3 days. Small crusts fall off within 7-10 days. Transplanted hair sheds at 2-3 weeks (normal process). New growth begins from month 3. Full beard results visible at 9-12 months.",
    results: "Permanent, natural-looking beard that can be shaved, trimmed, groomed, and styled just like natural facial hair. Typical procedures involve 800-2,000 grafts.",
    risks: "Minimal — temporary redness (3-5 days) and minor swelling. The face heals quickly due to excellent blood supply. Infection risk is extremely low.",
    pricing: "Starting from $1,800 depending on the area and density required.",
    faqs: [
      { q: "Can I shave my new beard?", a: "Yes! Once fully grown (6+ months), you can shave, trim, and style it exactly like natural facial hair." },
      { q: "Will it look natural?", a: "Absolutely. We match the angle, direction, curl pattern, and density to your natural growth for a completely authentic look." },
      { q: "How many grafts are needed for a full beard?", a: "A full beard typically requires 1,500-2,500 grafts. Filling patches may only need 500-1,000 grafts." },
      { q: "Is there visible scarring?", a: "No. The micro-FUE technique leaves virtually invisible donor scars, and the beard area heals without visible scarring." },
    ],
    image: "/images/before-after-beard-1.jpg",
  },
  "prp-hair-treatment": {
    title: "PRP Hair Treatment", tagline: "Harness your body's natural healing power",
    description: "Platelet-Rich Plasma (PRP) therapy is a revolutionary, natural treatment that uses your body's own growth factors to stimulate hair follicles, promote new hair growth, and improve hair thickness and quality. PRP is scientifically proven to increase blood supply to hair follicles, activate dormant follicles, and strengthen existing hair.",
    benefits: ["100% natural — uses your own blood", "Non-surgical, minimally invasive", "No downtime — return to activities immediately", "Stimulates dormant hair follicles", "Increases hair thickness and quality", "Can be combined with hair transplant for better results", "Safe with virtually no side effects", "Quick 30-45 minute procedure"],
    idealCandidate: ["Men and women with early to moderate hair thinning", "Those not ready for hair transplant surgery", "Post-transplant patients wanting to boost results", "People with weakening, miniaturizing hair", "Those preferring a natural, non-surgical approach"],
    steps: [
      { title: "Blood Draw", desc: "A small amount of blood (20-30ml) is drawn from your arm — similar to a routine blood test." },
      { title: "Centrifugation", desc: "Your blood is processed in a specialized centrifuge to separate and concentrate the platelet-rich plasma (3-5x concentration)." },
      { title: "Activation", desc: "The concentrated PRP is activated to release growth factors that stimulate hair follicle regeneration." },
      { title: "Micro-Injection", desc: "PRP is injected into targeted areas of the scalp using ultra-fine needles with topical anesthesia for comfort." },
    ],
    recovery: "No downtime. You can return to all normal activities immediately. Mild redness at injection sites fades within a few hours. Avoid washing hair for 24 hours.",
    results: "Visible improvement in hair thickness and quality after 2-3 sessions. Maximum results at 6-9 months. Recommended maintenance sessions every 3-6 months for sustained results.",
    risks: "Extremely safe since it uses your own blood. Minimal risks include temporary tenderness, mild swelling, or redness at injection points — all resolve within hours.",
    pricing: "Starting from $300 per session. Package pricing available for recommended treatment course.",
    faqs: [
      { q: "How many sessions do I need?", a: "Initial course: 3-4 sessions spaced 4 weeks apart. Maintenance: 1 session every 3-6 months." },
      { q: "Does PRP really work?", a: "Yes. Multiple clinical studies show PRP increases hair count by 30-40% and significantly improves hair thickness." },
      { q: "Can PRP be combined with a hair transplant?", a: "Absolutely! PRP before and after transplant improves graft survival, accelerates healing, and enhances density." },
      { q: "Is PRP painful?", a: "Topical anesthesia is applied before injections. Most patients describe it as very tolerable with minimal discomfort." },
    ],
    image: "/images/before-after-hair-1.jpg",
  },
  "botox": {
    title: "Botox", tagline: "Smooth wrinkles, refresh your look",
    description: "Botox (Botulinum Toxin) injections temporarily relax targeted facial muscles to smooth dynamic wrinkles and fine lines. Our expert injectors use precise micro-dosing techniques for natural-looking results that refresh your appearance without freezing your expressions. We use only FDA-approved products from trusted manufacturers to ensure safety and effectiveness.",
    benefits: ["Quick 15-minute treatment", "Zero downtime — resume activities immediately", "Visible results in 3-5 days", "Prevents formation of new wrinkles", "Natural-looking results when done by experts", "Can treat excessive sweating (hyperhidrosis)", "Relieves jaw tension and teeth grinding"],
    idealCandidate: ["Those with forehead lines and worry lines", "Crow's feet around the eyes", "Frown lines (glabellar lines) between eyebrows", "Bunny lines on the nose", "Preventative treatment for ages 25+", "Those with excessive sweating", "Jaw tension or teeth grinding sufferers"],
    steps: [
      { title: "Facial Assessment", desc: "Our doctor analyzes your facial muscles, skin quality, and areas of concern to create a personalized treatment plan." },
      { title: "Comfort Preparation", desc: "Topical numbing cream applied if desired. Ice may be used for additional comfort." },
      { title: "Precise Micro-Injection", desc: "Using ultra-fine needles, Botox is injected into specific muscles with exact dosing for natural results." },
      { title: "Post-Treatment Guidelines", desc: "Simple aftercare: stay upright for 4 hours, avoid rubbing the area, skip intense exercise for 24 hours." },
    ],
    recovery: "No downtime whatsoever. Resume all normal activities immediately. Avoid lying flat or intense exercise for 4-6 hours.",
    results: "Results appear in 3-5 days, reach peak effect at 2 weeks, and last 3-6 months. With regular treatments, results may last longer over time.",
    risks: "Rare side effects include temporary bruising at injection sites, mild headache (first time), or slight asymmetry (easily correctable). Serious complications are extremely rare with experienced injectors.",
    pricing: "Starting from $250 per area. Multi-area packages available.",
    faqs: [
      { q: "Does Botox hurt?", a: "Most patients describe it as a tiny pinch lasting 2-3 seconds. The needles are incredibly fine (30-gauge)." },
      { q: "How often do I need Botox?", a: "Every 3-6 months to maintain results. Some patients find they need less frequent treatments over time." },
      { q: "Will I look frozen?", a: "Not with our approach. We use conservative dosing and precise placement for a refreshed, natural look — not a frozen one." },
      { q: "Can I get Botox and fillers together?", a: "Yes! Many patients combine both for a comprehensive facial rejuvenation. This is called a 'liquid facelift.'" },
    ],
    image: "/images/before-after-botox-1.jpg",
  },
  "dermal-fillers": {
    title: "Dermal Fillers", tagline: "Restore volume and enhance contours",
    description: "Premium hyaluronic acid dermal fillers restore lost facial volume, enhance contours, and smooth deep lines and folds. Our injectors use advanced techniques including micro-cannulas for precise, natural-looking enhancement with minimal bruising. All products used are FDA-approved, biocompatible, and fully reversible.",
    benefits: ["Immediate visible results", "Natural-looking enhancement", "Minimal downtime (1-2 days mild swelling)", "Fully reversible treatment", "Stimulates your own collagen production", "Long-lasting results (6-18 months)", "Customizable to your exact goals"],
    idealCandidate: ["Those experiencing age-related volume loss", "Thin lips wanting natural enhancement", "Deep nasolabial folds (smile lines)", "Under-eye hollows and dark circles", "Cheek volume and contour enhancement", "Jawline definition and chin projection", "Hand rejuvenation"],
    steps: [
      { title: "Consultation & Planning", desc: "Thorough facial analysis to identify areas of volume loss and discuss your aesthetic goals. Before photos taken for comparison." },
      { title: "Numbing & Comfort", desc: "Topical numbing cream applied 20 minutes before. Most fillers also contain lidocaine for added comfort." },
      { title: "Strategic Injection", desc: "Filler is placed at precise depths using fine needles or cannulas. Multiple small injections for even, natural distribution." },
      { title: "Immediate Assessment", desc: "Results reviewed in mirror. Minor adjustments made if needed. Before/after comparison photos taken." },
    ],
    recovery: "Minimal downtime. Mild swelling for 1-3 days (lips may swell more). Minor bruising possible. Resume normal activities immediately. Avoid intense heat and exercise for 24 hours.",
    results: "Immediate results that continue to improve as swelling subsides. Duration varies: lips 6-9 months, cheeks 12-18 months, jawline 12-15 months.",
    risks: "Temporary swelling, minor bruising (5-10% of patients). Rare: lumps or asymmetry (easily correctable with massage or hyaluronidase). Vascular complications extremely rare with experienced injectors.",
    pricing: "Starting from $350 per syringe. Package pricing for multiple syringes.",
    faqs: [
      { q: "How long do fillers last?", a: "6-18 months depending on the product, treatment area, and your metabolism. Lips: 6-9 months. Cheeks: 12-18 months." },
      { q: "Can fillers be dissolved?", a: "Yes! Hyaluronic acid fillers can be completely dissolved with hyaluronidase enzyme if you're not happy with results." },
      { q: "Will fillers look unnatural?", a: "Not with our conservative approach. We aim for subtle, natural enhancement. You'll look refreshed, not 'done.'" },
      { q: "Is there any preparation needed?", a: "Avoid blood thinners, alcohol, and fish oil for 5-7 days before to minimize bruising risk." },
    ],
    image: "/images/before-after-filler-1.jpg",
  },
  "skin-rejuvenation": {
    title: "Skin Rejuvenation", tagline: "Restore your youthful glow",
    description: "Our comprehensive skin rejuvenation programs combine multiple advanced treatments including chemical peels, microneedling, LED therapy, and medical-grade skincare to address aging, sun damage, pigmentation, and skin texture concerns. Each program is customized based on your skin type, concerns, and goals.",
    benefits: ["Dramatically improved skin texture", "Reduced fine lines and wrinkles", "Even skin tone and reduced pigmentation", "Stimulated collagen and elastin production", "Radiant, glowing complexion", "Reduced pore size", "Improved skin hydration and elasticity"],
    idealCandidate: ["Those with sun-damaged skin", "Uneven skin tone or hyperpigmentation", "Fine lines and early wrinkles", "Dull, tired-looking skin", "Rough skin texture", "Enlarged pores", "Those wanting preventive anti-aging care"],
    steps: [
      { title: "Advanced Skin Analysis", desc: "Using dermatoscopy and UV imaging to assess skin damage, hydration levels, and areas of concern." },
      { title: "Customized Treatment Plan", desc: "A personalized protocol designed for your skin type, concerns, and lifestyle. May include multiple treatment modalities." },
      { title: "Treatment Sessions", desc: "Series of treatments spaced 2-4 weeks apart. Each session may combine multiple techniques for optimal results." },
      { title: "Skincare Protocol", desc: "Medical-grade home skincare routine prescribed to maintain and enhance treatment results." },
      { title: "Maintenance Program", desc: "Ongoing care plan including periodic treatments and product adjustments for lasting results." },
    ],
    recovery: "Varies by treatment. Chemical peels: 2-5 days of peeling. Microneedling: 1-2 days of redness. LED therapy: no downtime at all.",
    results: "Progressive improvement over 4-8 weeks with each session. Cumulative results build over the treatment course. Collagen remodeling continues for up to 6 months.",
    risks: "Temporary redness, mild peeling, and sun sensitivity during treatment period. Proper sun protection is essential. All treatments are medical-grade with established safety profiles.",
    pricing: "Starting from $200 per session. Treatment packages from $800 for a complete course.",
    faqs: [
      { q: "How many sessions do I need?", a: "Typically 3-6 sessions for optimal results, depending on your concerns and the treatments selected." },
      { q: "Is there downtime?", a: "Most treatments have minimal downtime of 1-3 days. Some like LED therapy have zero downtime." },
      { q: "Can I combine treatments?", a: "Yes! Combining treatments often produces superior results. Your plan will be customized to include complementary modalities." },
      { q: "When will I see results?", a: "Some improvement is visible after the first session. Maximum results develop over 4-12 weeks as collagen remodeling occurs." },
    ],
    image: "/images/before-after-skin-1.jpg",
  },
  "laser-treatments": {
    title: "Laser Treatments", tagline: "Precision technology for skin renewal",
    description: "Our state-of-the-art laser systems target specific skin concerns with unmatched precision. From pigmentation correction and scar treatment to skin tightening and hair removal, our range of medical-grade lasers provides effective solutions customized to your skin type and goals. All treatments are performed by certified laser specialists.",
    benefits: ["Targeted precision with minimal damage to surrounding tissue", "Effective for a wide range of skin concerns", "Progressive, long-lasting improvement", "Suitable for various skin types", "Can target specific depths of skin", "Stimulates natural collagen production", "FDA-cleared technology"],
    idealCandidate: ["Acne scarring and post-inflammatory marks", "Pigmentation issues (melasma, sun spots, age spots)", "Fine lines and wrinkles", "Skin tightening and laxity", "Vascular lesions (spider veins, redness)", "Unwanted hair removal", "Tattoo removal"],
    steps: [
      { title: "Skin Assessment", desc: "Fitzpatrick skin type analysis and laser selection. Test patch may be performed for safety verification." },
      { title: "Preparation", desc: "Numbing cream applied 30 minutes prior. Protective eyewear fitted for both patient and staff." },
      { title: "Laser Treatment", desc: "Precision laser application to target areas. Duration varies from 15-60 minutes depending on the area and concern." },
      { title: "Cool Down & Soothing", desc: "Cooling gel and soothing treatment applied immediately post-procedure to minimize redness and discomfort." },
    ],
    recovery: "2-7 days depending on treatment intensity. Fractional lasers: 3-5 days of redness and peeling. IPL: 1-2 days of mild redness. Strict sun avoidance required for 2-4 weeks.",
    results: "Progressive improvement over 4-12 weeks as collagen remodels. Most concerns require 3-5 sessions spaced 4-6 weeks apart for optimal results.",
    risks: "Temporary redness, swelling, and crusting. Pigmentation changes possible (rare with proper protocols and patient selection). All treatments performed by certified specialists.",
    pricing: "Starting from $300 per session. Multi-session packages available.",
    faqs: [
      { q: "Is laser treatment painful?", a: "Most patients feel a mild warming or snapping sensation. Numbing cream ensures comfort throughout the treatment." },
      { q: "How many sessions are needed?", a: "Typically 3-5 sessions depending on the concern. Some conditions improve significantly after just 1-2 sessions." },
      { q: "Is laser safe for dark skin?", a: "Yes, when using appropriate lasers. Our Nd:YAG laser is specifically designed to be safe for all skin types including darker skin." },
      { q: "How long between sessions?", a: "Usually 4-6 weeks apart to allow complete healing and collagen remodeling between treatments." },
    ],
    image: "/images/before-after-laser-1.jpg",
  },
  "facial-treatments": {
    title: "Facial Treatments", tagline: "Customized care for radiant skin",
    description: "Our medical-grade facial treatments go beyond standard facials. Combining deep cleansing, exfoliation, extraction, hydration, and targeted serums, our treatments are customized for every skin type and concern. From the popular HydraFacial to clinical-grade peels, each treatment delivers visible results.",
    benefits: ["Deep cleansing and pore purification", "Immediate skin radiance", "Customized for your skin type", "No downtime for most treatments", "Hydration boost for dry skin", "Reduces oiliness and breakouts", "Prepares skin for special events"],
    idealCandidate: ["Anyone wanting healthier, clearer skin", "Pre-event skin preparation", "Those with oily or acne-prone skin", "Dry, dehydrated skin needing hydration", "Regular skincare maintenance"],
    steps: [
      { title: "Skin Analysis", desc: "Detailed assessment of your skin type, concerns, and sensitivities." },
      { title: "Deep Cleansing", desc: "Professional-grade cleansing to remove impurities, makeup, and excess oil." },
      { title: "Treatment Application", desc: "Customized combination of exfoliation, serums, masks, and LED therapy." },
      { title: "Hydration & Protection", desc: "Final hydration layer and SPF application for protected, glowing skin." },
    ],
    recovery: "No downtime for most treatments. Skin may appear slightly flushed for 1-2 hours. Chemical peels may cause 1-3 days of light peeling.",
    results: "Immediate glow and smoothness. Regular monthly treatments produce cumulative, long-term skin improvement.",
    risks: "Very low risk. Temporary redness possible. Always inform us of allergies or sensitivities before treatment.",
    pricing: "Starting from $150 per session.",
    faqs: [
      { q: "How often should I get a facial?", a: "Every 4-6 weeks for optimal skin health. More frequent for specific concerns." },
      { q: "Can I wear makeup after?", a: "We recommend waiting 6-12 hours to let your skin absorb the treatment benefits fully." },
    ],
    image: "/images/clinic-interior.jpg",
  },
  "acne-treatment": {
    title: "Acne Treatment", tagline: "Clear skin, renewed confidence",
    description: "Our medical-grade acne treatment programs address acne at its root cause — whether hormonal, bacterial, or inflammatory. Using a combination of clinical treatments, medical-grade products, and advanced procedures like blue light therapy and chemical peels, we create personalized protocols that clear existing breakouts and prevent future ones.",
    benefits: ["Targets acne at the root cause", "Reduces active breakouts rapidly", "Prevents future breakouts", "Minimizes acne scarring", "Improves overall skin texture", "Reduces excess oil production", "Boosts confidence"],
    idealCandidate: ["Teens and adults with persistent acne", "Hormonal acne sufferers", "Those who haven't responded to over-the-counter products", "Cystic or inflammatory acne", "Acne with scarring concerns"],
    steps: [
      { title: "Comprehensive Assessment", desc: "Skin analysis to determine acne type, severity, triggers, and any scarring present." },
      { title: "Treatment Plan", desc: "Customized protocol combining in-clinic treatments with home care products." },
      { title: "Clinical Treatments", desc: "Regular sessions including chemical peels, blue light therapy, and extraction as needed." },
      { title: "Maintenance Protocol", desc: "Long-term skincare routine and periodic check-ups to maintain clear skin." },
    ],
    recovery: "Most treatments have minimal downtime. Chemical peels may cause 2-3 days of light peeling. Blue light therapy has zero downtime.",
    results: "Visible improvement within 2-4 weeks. Significant clearing in 8-12 weeks. Maintenance program keeps skin clear long-term.",
    risks: "Minimal. Temporary dryness, peeling, or purging period possible in the first 2 weeks as skin adjusts.",
    pricing: "Starting from $180 per session. Treatment courses from $700.",
    faqs: [
      { q: "Will my acne come back?", a: "With proper maintenance and skincare routine, results are long-lasting. We teach you how to keep skin clear." },
      { q: "How long until I see results?", a: "Most patients see improvement within 2-4 weeks. Full clearing typically takes 8-12 weeks." },
    ],
    image: "/images/before-after-skin-1.jpg",
  },
  "scar-treatment": {
    title: "Scar Treatment", tagline: "Minimize scars, maximize confidence",
    description: "Our advanced scar treatment options combine multiple modalities to significantly reduce the appearance of scars from acne, surgery, burns, or injuries. Using fractional laser, microneedling, PRP, and specialized scar creams, we create comprehensive treatment plans that dramatically improve scar texture, color, and overall appearance.",
    benefits: ["Significant reduction in scar visibility", "Improved skin texture in scarred areas", "Multiple treatment options available", "Suitable for old and new scars", "Can treat scars anywhere on the body", "Stimulates natural skin remodeling", "Progressive, cumulative results"],
    idealCandidate: ["Those with acne scars (ice pick, boxcar, rolling)", "Surgical scars", "Burn scars", "Injury or trauma scars", "Stretch marks", "Keloid or hypertrophic scars"],
    steps: [
      { title: "Scar Assessment", desc: "Detailed analysis of scar type, depth, age, and location to determine the best treatment approach." },
      { title: "Treatment Selection", desc: "Customized combination of treatments: fractional laser, microneedling, PRP, subcision, or filler as appropriate." },
      { title: "Treatment Course", desc: "Series of treatments spaced 4-6 weeks apart for optimal collagen remodeling and skin regeneration." },
      { title: "Maintenance & Follow-Up", desc: "Post-treatment skincare protocol and follow-up assessments to track improvement." },
    ],
    recovery: "3-7 days depending on treatment intensity. Redness and mild swelling are normal. Strict sun protection required during treatment course.",
    results: "30-70% improvement in scar appearance depending on scar type and treatment approach. Results continue to improve for 3-6 months after the last session.",
    risks: "Temporary redness, swelling, and crusting. Pigmentation changes possible in darker skin types (managed with proper protocols). All treatments performed by experienced specialists.",
    pricing: "Starting from $250 per session. Treatment courses from $900.",
    faqs: [
      { q: "Can old scars be treated?", a: "Yes! While newer scars respond faster, even scars that are years or decades old can be significantly improved." },
      { q: "How many sessions are needed?", a: "Typically 3-6 sessions depending on scar severity. Some improvement is visible after the first session." },
    ],
    image: "/images/before-after-laser-1.jpg",
  },
};

const serviceDataAR: Record<string, ServiceContent> = {
  "hair-transplant": {
    title: "زراعة الشعر", tagline: "استعادة شعر طبيعية ودائمة",
    description: "تستخدم عمليات زراعة الشعر لدينا أحدث تقنيات FUE (استخراج وحدة البصيلات) و DHI (زراعة الشعر المباشرة) لتقديم نتائج طبيعية ودائمة. يتم التخطيط لكل عملية بدقة باستخدام تصوير ثلاثي الأبعاد متقدم لضمان كثافة مثالية وتصميم خط شعر مثالي. نجري أكثر من 2,000 عملية زراعة شعر سنوياً مما يجعل بيستار كلينك من أكثر المراكز خبرة في المنطقة.",
    benefits: ["نتائج دائمة وطبيعية المظهر", "ندوب ضئيلة بتقنية FUE", "فترة تعافي سريعة (3-5 أيام)", "لا حاجة لغرز جراحية", "تخدير موضعي — إجراء بدون ألم", "تصميم خط شعر مخصص بمحاكاة ثلاثية الأبعاد", "نسبة نجاح البصيلات 95-98%", "مناسب للرجال والنساء"],
    idealCandidate: ["الرجال والنساء الذين يعانون من الصلع الوراثي (نوروود 2-7)", "أصحاب خطوط الشعر المتراجعة", "من يعانون من ترقق الشعر في التاج أو الصدغين", "الباحثون عن حل دائم لتساقط الشعر", "الأشخاص الأصحاء ذوو كثافة شعر مانحة كافية", "المرضى الذين جربوا العلاجات الدوائية دون نجاح"],
    steps: [
      { title: "الاستشارة والتخطيط ثلاثي الأبعاد", desc: "تحليل مفصل لفروة الرأس باستخدام الديرموسكوبي، استشارة تصميم خط الشعر، ومحاكاة ثلاثية الأبعاد للنتائج المتوقعة. نصور فروة رأسك من جميع الزوايا ونضع خطة علاج مخصصة." },
      { title: "فحوصات الدم والتحضير", desc: "فحوصات دم روتينية لضمان السلامة. يتم تحديد المناطق المانحة والمستقبلة. يُطبق التخدير الموضعي لتجربة خالية من الألم تماماً." },
      { title: "استخراج البصيلات (FUE)", desc: "يتم استخراج البصيلات الفردية بعناية من المنطقة المانحة باستخدام أدوات دقيقة (0.6-0.9 مم). لا تترك ندبة خطية وتلتئم خلال أيام." },
      { title: "فتح القنوات", desc: "يتم إنشاء مواقع الاستقبال بزوايا دقيقة (40-45 درجة) وأعماق تتطابق مع نمط نمو شعرك الطبيعي لتحقيق أقصى درجة من الطبيعية." },
      { title: "زراعة البصيلات", desc: "تُزرع البصيلات واحدة تلو الأخرى في القنوات المُعدة. يضمن فريقنا كثافة مثالية (40-60 بصيلة/سم²) لتغطية كثيفة وطبيعية." },
      { title: "الرعاية بعد العملية والمتابعة", desc: "توفير حقيبة رعاية مفصلة تشمل الأدوية والشامبو الخاص والبخاخ. مواعيد متابعة في اليوم 3 والأسبوع 1 والشهر 1 والشهر 6." },
    ],
    recovery: "يعود معظم المرضى لأنشطتهم الطبيعية خلال 3-5 أيام. تلتئم المنطقة المانحة خلال 7-10 أيام. يحدث تساقط أولي للشعر المزروع في الأسبوع 2-4 (هذا طبيعي تماماً). يبدأ النمو الجديد من الشهر 3، مع تحسن ملحوظ بحلول الشهر 6. تظهر النتائج النهائية الكاملة عند 12-18 شهراً.",
    results: "نسبة نجاح البصيلات 95-98%. شعر دائم وطبيعي المظهر ينمو باستمرار. يمكنك قصه وتصفيفه وصبغه مثل شعرك الطبيعي تماماً. يحقق معظم المرضى زيادة في الكثافة بنسبة 60-80% في المنطقة المعالجة.",
    risks: "المخاطر ضئيلة تشمل تورم مؤقت (2-3 أيام)، احمرار في المناطق المانحة/المستقبلة (5-7 أيام)، وتنميل مؤقت. خطر العدوى منخفض للغاية (<0.1%) بفضل بروتوكولات التعقيم الصارمة.",
    pricing: "اسعارنا مميزه ويتم تحديدها بعد التقييم ",
    faqs: [
      { q: "كم تستغرق العملية؟", a: "عادة 6-8 ساعات لـ 3,000-4,000 بصيلة. الجلسات الكبيرة قد تُقسم على يومين لراحة المريض." },
      { q: "هل العملية مؤلمة؟", a: "لا. التخدير الموضعي يضمن عدم الشعور بأي ألم. معظم المرضى يشاهدون أفلاماً أو ينامون أثناء العملية." },
      { q: "متى أرى النتائج النهائية؟", a: "يبدأ النمو الجديد في الشهر 3-4. ستلاحظ تحسناً كبيراً في الشهر 6-8. النتائج الكاملة تظهر عند 12-18 شهراً." },
      { q: "كم عدد البصيلات التي أحتاجها؟", a: "يعتمد على نمط تساقط شعرك. خلال الاستشارة سنحدد العدد الدقيق (عادة 2,000-5,000 بصيلة)." },
      { q: "هل سيعرف أحد أنني أجريت زراعة؟", a: "لا. تقنيتنا تعطي نتائج طبيعية لدرجة أن حتى الحلاقين لا يمكنهم ملاحظتها." },
      { q: "هل يمكنني السفر بعد العملية؟", a: "نعم، يمكنك السفر بعد 2-3 أيام من الجراحة. نوفر جميع مستلزمات الرعاية اللازمة لرحلتك." },
    ],
    image: "/images/service-hair.jpg",
  },
  "beard-transplant": {
    title: "زراعة اللحية", tagline: "لحية كاملة وطبيعية المظهر",
    description: "تستخدم عملية زراعة اللحية لدينا تقنية FUE المتقدمة لنقل بصيلات الشعر من فروة الرأس إلى منطقة اللحية، مما يخلق لحية كاملة وطبيعية تتناسب تماماً مع هيكل وجهك والمظهر المطلوب. سواء كان لديك نمو متقطع أو ندوب أو ببساطة لا تستطيع إنماء شعر الوجه، يمكننا مساعدتك.",
    benefits: ["مظهر كامل وكثافة طبيعية", "نتائج دائمة مدى الحياة", "تصميم لحية مخصص يناسب وجهك", "ملء المناطق الفارغة بسلاسة", "ندوب ضئيلة — غير مرئية تقريباً", "تغطية ندوب الحروق أو الإصابات", "تنمو وتُحلق وتُصفف كاللحية الطبيعية"],
    idealCandidate: ["الرجال ذوو اللحى المتقطعة أو الرقيقة", "من لا يستطيعون إنماء شعر الوجه وراثياً", "الرجال الراغبون في تغطية ندوب الوجه", "الراغبون في لحية أكثر كثافة وتحديداً", "من يريدون نمط لحية معين لكن يفتقرون للكثافة"],
    steps: [
      { title: "استشارة تصميم اللحية", desc: "نعمل معاً لتصميم شكل اللحية المثالي مع مراعاة هيكل وجهك وخط الفك وتفضيلاتك الشخصية." },
      { title: "تحضير المنطقة المانحة", desc: "يتم اختيار بصيلات الشعر من فروة الرأس (عادة الجزء الخلفي) لتتوافق مع خصائص شعر اللحية." },
      { title: "استخراج البصيلات", desc: "استخراج البصيلات الفردية باستخدام تقنية FUE الدقيقة لأقل ندوب ممكنة في المنطقة المانحة." },
      { title: "الزراعة الدقيقة", desc: "توضع البصيلات بزوايا نمو اللحية الطبيعية (10-20 درجة) لضمان اتجاه ومظهر أصيل." },
      { title: "بروتوكول الرعاية", desc: "تعليمات رعاية مفصلة بعد العملية. يتم حماية منطقة اللحية بضمادة خاصة في الليلة الأولى." },
    ],
    recovery: "العودة للعمل خلال 2-3 أيام. القشور الصغيرة تسقط خلال 7-10 أيام. الشعر المزروع يتساقط في الأسبوع 2-3 (عملية طبيعية). النمو الجديد يبدأ من الشهر 3. النتائج الكاملة تظهر عند 9-12 شهراً.",
    results: "لحية دائمة وطبيعية المظهر يمكن حلاقتها وتهذيبها وتصفيفها مثل شعر الوجه الطبيعي. العمليات النموذجية تشمل 800-2,000 بصيلة.",
    risks: "ضئيلة — احمرار مؤقت (3-5 أيام) وتورم بسيط. يلتئم الوجه بسرعة بفضل التروية الدموية الممتازة.",
    pricing: "اسعارنا مميزه ويتم تحديدها بعد التقييم ",
    faqs: [
      { q: "هل يمكنني حلاقة لحيتي الجديدة؟", a: "نعم! بمجرد اكتمال النمو (6+ أشهر)، يمكنك حلاقتها وتهذيبها وتصفيفها تماماً كشعر الوجه الطبيعي." },
      { q: "هل ستبدو طبيعية؟", a: "بالتأكيد. نطابق الزاوية والاتجاه ونمط التجعد والكثافة مع نموك الطبيعي لمظهر أصيل تماماً." },
      { q: "كم عدد البصيلات المطلوبة للحية كاملة؟", a: "اللحية الكاملة تتطلب عادة 1,500-2,500 بصيلة. ملء الفراغات قد يحتاج 500-1,000 بصيلة فقط." },
      { q: "هل هناك ندوب مرئية؟", a: "لا. تقنية FUE الدقيقة تترك ندوباً غير مرئية تقريباً." },
    ],
    image: "/images/before-after-beard-1.jpg",
  },
  "prp-hair-treatment": {
    title: "علاج PRP للشعر", tagline: "استغل قوة الشفاء الطبيعية لجسمك",
    description: "علاج البلازما الغنية بالصفائح الدموية (PRP) هو علاج ثوري وطبيعي يستخدم عوامل النمو الخاصة بجسمك لتحفيز بصيلات الشعر وتعزيز نمو شعر جديد وتحسين كثافة وجودة الشعر. أثبت علمياً أنه يزيد التروية الدموية لبصيلات الشعر وينشط البصيلات الخاملة ويقوي الشعر الموجود.",
    benefits: ["طبيعي 100% — يستخدم دمك", "غير جراحي وأقل تدخلاً", "لا فترة توقف — عودة فورية للأنشطة", "ينشط بصيلات الشعر الخاملة", "يزيد كثافة وجودة الشعر", "يمكن دمجه مع زراعة الشعر لنتائج أفضل", "آمن بدون آثار جانبية تقريباً", "إجراء سريع 30-45 دقيقة"],
    idealCandidate: ["الرجال والنساء الذين يعانون من ترقق الشعر المبكر إلى المتوسط", "من ليسوا مستعدين لجراحة زراعة الشعر", "مرضى ما بعد الزراعة الراغبون في تعزيز النتائج", "أصحاب الشعر الضعيف والمتقلص", "من يفضلون نهجاً طبيعياً غير جراحي"],
    steps: [
      { title: "سحب الدم", desc: "يتم سحب كمية صغيرة من الدم (20-30 مل) من ذراعك — مشابه لفحص الدم الروتيني." },
      { title: "الطرد المركزي", desc: "يُعالج دمك في جهاز طرد مركزي متخصص لفصل وتركيز البلازما الغنية بالصفائح الدموية (تركيز 3-5 أضعاف)." },
      { title: "التنشيط", desc: "يتم تنشيط البلازما المركزة لإطلاق عوامل النمو التي تحفز تجديد بصيلات الشعر." },
      { title: "الحقن الدقيق", desc: "يتم حقن البلازما في المناطق المستهدفة من فروة الرأس باستخدام إبر رفيعة جداً مع تخدير موضعي للراحة." },
    ],
    recovery: "لا فترة توقف. يمكنك العودة لجميع أنشطتك فوراً. احمرار خفيف في مواقع الحقن يتلاشى خلال ساعات. تجنب غسل الشعر لمدة 24 ساعة.",
    results: "تحسن ملحوظ في كثافة وجودة الشعر بعد 2-3 جلسات. أقصى نتائج عند 6-9 أشهر. جلسات صيانة موصى بها كل 3-6 أشهر.",
    risks: "آمن للغاية لأنه يستخدم دمك الخاص. مخاطر ضئيلة تشمل ألم مؤقت وتورم خفيف أو احمرار في نقاط الحقن — تزول خلال ساعات.",
    pricing: "اسعارنا مميزه ويتم تحديدها بعد التقييم ",
    faqs: [
      { q: "كم عدد الجلسات المطلوبة؟", a: "الدورة الأولى: 3-4 جلسات بفارق 4 أسابيع. الصيانة: جلسة كل 3-6 أشهر." },
      { q: "هل PRP يعمل فعلاً؟", a: "نعم. دراسات سريرية متعددة تُظهر أن PRP يزيد عدد الشعر بنسبة 30-40% ويحسن كثافة الشعر بشكل ملحوظ." },
      { q: "هل يمكن دمج PRP مع زراعة الشعر؟", a: "بالتأكيد! PRP قبل وبعد الزراعة يحسن نسبة نجاح البصيلات ويسرع الشفاء ويعزز الكثافة." },
      { q: "هل PRP مؤلم؟", a: "يُطبق تخدير موضعي قبل الحقن. معظم المرضى يصفونه بأنه محتمل جداً مع إزعاج ضئيل." },
    ],
    image: "/images/before-after-hair-1.jpg",
  },
  "botox": {
    title: "بوتكس", tagline: "تنعيم التجاعيد وتجديد مظهرك",
    description: "حقن البوتكس (توكسين البوتولينوم) تُرخي عضلات الوجه المستهدفة مؤقتاً لتنعيم التجاعيد الحركية والخطوط الدقيقة. يستخدم أطباؤنا الخبراء تقنيات الحقن الدقيق للحصول على نتائج طبيعية تنعش مظهرك دون تجميد تعابيرك. نستخدم فقط منتجات معتمدة من FDA من مصنعين موثوقين.",
    benefits: ["علاج سريع 15 دقيقة", "لا فترة توقف — استئناف فوري للأنشطة", "نتائج مرئية خلال 3-5 أيام", "يمنع تكوّن تجاعيد جديدة", "نتائج طبيعية عند إجرائها بأيدي خبراء", "يمكن علاج التعرق المفرط", "يخفف توتر الفك وصرير الأسنان"],
    idealCandidate: ["أصحاب خطوط الجبين وخطوط القلق", "تجاعيد حول العينين (قدم الغراب)", "خطوط العبوس بين الحاجبين", "الخطوط على الأنف", "العلاج الوقائي للأعمار 25+", "من يعانون التعرق المفرط", "من يعانون توتر الفك أو صرير الأسنان"],
    steps: [
      { title: "تقييم الوجه", desc: "يحلل طبيبنا عضلات وجهك وجودة بشرتك ومناطق القلق لإنشاء خطة علاج مخصصة." },
      { title: "تحضير الراحة", desc: "كريم تخدير موضعي يُطبق حسب الرغبة. يمكن استخدام الثلج لراحة إضافية." },
      { title: "الحقن الدقيق", desc: "باستخدام إبر رفيعة جداً، يُحقن البوتكس في عضلات محددة بجرعات دقيقة لنتائج طبيعية." },
      { title: "إرشادات ما بعد العلاج", desc: "رعاية بسيطة: البقاء في وضعية مستقيمة 4 ساعات، تجنب فرك المنطقة، تخطي التمارين المكثفة لـ 24 ساعة." },
    ],
    recovery: "لا فترة توقف على الإطلاق. استئناف جميع الأنشطة فوراً. تجنب الاستلقاء والتمارين المكثفة لـ 4-6 ساعات.",
    results: "النتائج تظهر خلال 3-5 أيام، تصل ذروتها في أسبوعين، وتستمر 3-6 أشهر. مع العلاج المنتظم قد تدوم أطول.",
    risks: "آثار جانبية نادرة تشمل كدمات مؤقتة في مواقع الحقن، صداع خفيف (المرة الأولى)، أو عدم تماثل طفيف (يُصحح بسهولة).",
    pricing: "اسعارنا مميزه ويتم تحديدها بعد التقييم ",
    faqs: [
      { q: "هل البوتكس مؤلم؟", a: "معظم المرضى يصفونه بوخزة صغيرة تستمر 2-3 ثوانٍ. الإبر رفيعة جداً (30 gauge)." },
      { q: "كم مرة أحتاج البوتكس؟", a: "كل 3-6 أشهر للحفاظ على النتائج. بعض المرضى يجدون أنهم يحتاجونه بتكرار أقل مع الوقت." },
      { q: "هل سأبدو متجمداً؟", a: "لا مع نهجنا. نستخدم جرعات محافظة ووضع دقيق للحصول على مظهر منتعش وطبيعي." },
      { q: "هل يمكنني الحصول على بوتكس وفيلر معاً؟", a: "نعم! كثير من المرضى يجمعون بين الاثنين لتجديد شامل للوجه. يُسمى هذا 'شد الوجه السائل'." },
    ],
    image: "/images/before-after-botox-1.jpg",
  },
  "dermal-fillers": {
    title: "فيلر", tagline: "استعادة الحجم وتحسين الملامح",
    description: "فيلر حمض الهيالورونيك الفاخر يستعيد حجم الوجه المفقود ويحسن الملامح وينعم الخطوط والطيات العميقة. يستخدم أطباؤنا تقنيات متقدمة بما في ذلك الكانيولا الدقيقة لتحسين طبيعي ودقيق مع أقل كدمات. جميع المنتجات المستخدمة معتمدة من FDA ومتوافقة حيوياً وقابلة للعكس.",
    benefits: ["نتائج مرئية فورية", "تحسين طبيعي المظهر", "فترة توقف ضئيلة (1-2 أيام تورم خفيف)", "علاج قابل للعكس بالكامل", "يحفز إنتاج الكولاجين الخاص بك", "نتائج طويلة الأمد (6-18 شهراً)", "قابل للتخصيص حسب أهدافك"],
    idealCandidate: ["من يعانون فقدان حجم مرتبط بالعمر", "الشفاه الرقيقة الراغبة في تحسين طبيعي", "الطيات الأنفية الشفوية العميقة (خطوط الابتسامة)", "تجويف تحت العين والهالات السوداء", "تحسين حجم وملامح الخدين", "تحديد خط الفك وبروز الذقن", "تجديد اليدين"],
    steps: [
      { title: "الاستشارة والتخطيط", desc: "تحليل شامل للوجه لتحديد مناطق فقدان الحجم ومناقشة أهدافك الجمالية. التقاط صور قبل للمقارنة." },
      { title: "التخدير والراحة", desc: "كريم تخدير موضعي يُطبق 20 دقيقة قبل العلاج. معظم الفيلر يحتوي أيضاً على ليدوكايين لراحة إضافية." },
      { title: "الحقن الاستراتيجي", desc: "يُوضع الفيلر في أعماق دقيقة باستخدام إبر رفيعة أو كانيولا. حقنات متعددة صغيرة لتوزيع متساوٍ وطبيعي." },
      { title: "التقييم الفوري", desc: "مراجعة النتائج في المرآة. إجراء تعديلات بسيطة إذا لزم الأمر. التقاط صور قبل/بعد للمقارنة." },
    ],
    recovery: "فترة توقف ضئيلة. تورم خفيف لـ 1-3 أيام (الشفاه قد تتورم أكثر). كدمات بسيطة محتملة. استئناف الأنشطة فوراً. تجنب الحرارة الشديدة والتمارين لـ 24 ساعة.",
    results: "نتائج فورية تستمر في التحسن مع زوال التورم. المدة تختلف: الشفاه 6-9 أشهر، الخدود 12-18 شهراً، خط الفك 12-15 شهراً.",
    risks: "تورم مؤقت، كدمات بسيطة (5-10% من المرضى). نادر: كتل أو عدم تماثل (يُصحح بسهولة). المضاعفات الوعائية نادرة جداً مع الأطباء ذوي الخبرة.",
    pricing: "اسعارنا مميزه ويتم تحديدها بعد التقييم ",
    faqs: [
      { q: "كم يدوم الفيلر؟", a: "6-18 شهراً حسب المنتج ومنطقة العلاج. الشفاه: 6-9 أشهر. الخدود: 12-18 شهراً." },
      { q: "هل يمكن إزالة الفيلر؟", a: "نعم! فيلر حمض الهيالورونيك يمكن إذابته بالكامل بإنزيم الهيالورونيداز إذا لم تكن راضياً." },
      { q: "هل سيبدو الفيلر غير طبيعي؟", a: "ليس مع نهجنا المحافظ. نهدف لتحسين دقيق وطبيعي. ستبدو منتعشاً لا 'معدّلاً'." },
      { q: "هل هناك تحضيرات مطلوبة؟", a: "تجنب مميعات الدم والكحول وزيت السمك لـ 5-7 أيام قبل العلاج لتقليل خطر الكدمات." },
    ],
    image: "/images/before-after-filler-1.jpg",
  },
  "skin-rejuvenation": {
    title: "تجديد البشرة", tagline: "استعد توهجك الشبابي",
    description: "برامج تجديد البشرة الشاملة لدينا تجمع بين علاجات متقدمة متعددة بما في ذلك التقشير الكيميائي والميكرونيدلينج والعلاج بالضوء LED ومنتجات العناية بالبشرة الطبية لمعالجة الشيخوخة وأضرار الشمس والتصبغات ومشاكل ملمس البشرة. كل برنامج مخصص بناءً على نوع بشرتك ومخاوفك وأهدافك.",
    benefits: ["تحسين كبير في ملمس البشرة", "تقليل الخطوط الدقيقة والتجاعيد", "توحيد لون البشرة وتقليل التصبغات", "تحفيز إنتاج الكولاجين والإيلاستين", "بشرة متوهجة ومشرقة", "تقليل حجم المسام", "تحسين ترطيب ومرونة البشرة"],
    idealCandidate: ["أصحاب البشرة المتضررة من الشمس", "لون البشرة غير الموحد أو فرط التصبغ", "الخطوط الدقيقة والتجاعيد المبكرة", "البشرة الباهتة والمرهقة", "ملمس البشرة الخشن", "المسام الواسعة", "الراغبون في رعاية وقائية ضد الشيخوخة"],
    steps: [
      { title: "تحليل البشرة المتقدم", desc: "باستخدام الديرموسكوبي والتصوير بالأشعة فوق البنفسجية لتقييم أضرار البشرة ومستويات الترطيب ومناطق القلق." },
      { title: "خطة علاج مخصصة", desc: "بروتوكول مخصص لنوع بشرتك ومخاوفك ونمط حياتك. قد يشمل طرق علاج متعددة." },
      { title: "جلسات العلاج", desc: "سلسلة علاجات بفاصل 2-4 أسابيع. كل جلسة قد تجمع تقنيات متعددة لنتائج مثلى." },
      { title: "بروتوكول العناية بالبشرة", desc: "روتين عناية منزلي طبي يوصف للحفاظ على نتائج العلاج وتعزيزها." },
      { title: "برنامج الصيانة", desc: "خطة رعاية مستمرة تشمل علاجات دورية وتعديلات المنتجات لنتائج دائمة." },
    ],
    recovery: "تختلف حسب العلاج. التقشير الكيميائي: 2-5 أيام تقشر. الميكرونيدلينج: 1-2 أيام احمرار. العلاج بالضوء: لا فترة توقف.",
    results: "تحسن تدريجي خلال 4-8 أسابيع مع كل جلسة. النتائج التراكمية تتراكم خلال الدورة العلاجية. إعادة تشكيل الكولاجين تستمر حتى 6 أشهر.",
    risks: "احمرار مؤقت، تقشر خفيف، وحساسية للشمس أثناء فترة العلاج. الحماية من الشمس ضرورية.",
    pricing: "اسعارنا مميزه ويتم تحديدها بعد التقييم ",
    faqs: [
      { q: "كم عدد الجلسات المطلوبة؟", a: "عادة 3-6 جلسات لنتائج مثلى حسب مخاوفك والعلاجات المختارة." },
      { q: "هل هناك فترة توقف؟", a: "معظم العلاجات لها فترة توقف ضئيلة 1-3 أيام. بعضها كالعلاج بالضوء بدون أي فترة توقف." },
      { q: "هل يمكنني دمج العلاجات؟", a: "نعم! الجمع بين العلاجات غالباً يعطي نتائج متفوقة." },
      { q: "متى سأرى النتائج؟", a: "بعض التحسن مرئي بعد الجلسة الأولى. النتائج القصوى تتطور خلال 4-12 أسبوعاً." },
    ],
    image: "/images/before-after-skin-1.jpg",
  },
  "laser-treatments": {
    title: "علاجات الليزر", tagline: "تقنية دقيقة لتجديد البشرة",
    description: "أنظمة الليزر المتطورة لدينا تستهدف مشاكل البشرة المحددة بدقة لا مثيل لها. من تصحيح التصبغات وعلاج الندوب إلى شد البشرة وإزالة الشعر، مجموعة أجهزة الليزر الطبية لدينا توفر حلولاً فعالة مخصصة لنوع بشرتك وأهدافك.",
    benefits: ["دقة مستهدفة مع أقل ضرر للأنسجة المحيطة", "فعال لمجموعة واسعة من مشاكل البشرة", "تحسن تدريجي ودائم", "مناسب لأنواع البشرة المختلفة", "يمكن استهداف أعماق محددة من البشرة", "يحفز إنتاج الكولاجين الطبيعي", "تقنية معتمدة من FDA"],
    idealCandidate: ["ندوب حب الشباب والعلامات", "مشاكل التصبغ (الكلف، بقع الشمس، بقع العمر)", "الخطوط الدقيقة والتجاعيد", "شد البشرة والترهل", "الآفات الوعائية (عروق العنكبوت، الاحمرار)", "إزالة الشعر غير المرغوب فيه", "إزالة الوشم"],
    steps: [
      { title: "تقييم البشرة", desc: "تحليل نوع البشرة (فيتزباتريك) واختيار الليزر المناسب. قد يُجرى اختبار موضعي للتحقق من السلامة." },
      { title: "التحضير", desc: "كريم تخدير يُطبق 30 دقيقة قبل العلاج. نظارات واقية توضع للمريض والطاقم." },
      { title: "العلاج بالليزر", desc: "تطبيق ليزر دقيق على المناطق المستهدفة. المدة تتراوح من 15-60 دقيقة حسب المنطقة والمشكلة." },
      { title: "التبريد والتهدئة", desc: "جل تبريد وعلاج مهدئ يُطبق فوراً بعد الإجراء لتقليل الاحمرار والانزعاج." },
    ],
    recovery: "2-7 أيام حسب شدة العلاج. الليزر الجزئي: 3-5 أيام احمرار وتقشر. IPL: 1-2 أيام احمرار خفيف. تجنب الشمس ضروري لـ 2-4 أسابيع.",
    results: "تحسن تدريجي خلال 4-12 أسبوعاً. معظم المشاكل تتطلب 3-5 جلسات بفاصل 4-6 أسابيع.",
    risks: "احمرار مؤقت وتورم وقشور. تغيرات في التصبغ ممكنة (نادرة مع البروتوكولات الصحيحة). جميع العلاجات تُجرى بأيدي متخصصين معتمدين.",
    pricing: "اسعارنا مميزه ويتم تحديدها بعد التقييم ",
    faqs: [
      { q: "هل علاج الليزر مؤلم؟", a: "يشعر معظم المرضى بإحساس تسخين أو نقر خفيف. كريم التخدير يضمن الراحة طوال العلاج." },
      { q: "كم عدد الجلسات المطلوبة؟", a: "عادة 3-5 جلسات. بعض المشاكل تتحسن بشكل ملحوظ بعد 1-2 جلسة فقط." },
      { q: "هل الليزر آمن للبشرة الداكنة؟", a: "نعم، عند استخدام أجهزة ليزر مناسبة. ليزر Nd:YAG مصمم خصيصاً لجميع أنواع البشرة." },
      { q: "كم المدة بين الجلسات؟", a: "عادة 4-6 أسابيع للسماح بالشفاء الكامل وإعادة تشكيل الكولاجين." },
    ],
    image: "/images/before-after-laser-1.jpg",
  },
  "facial-treatments": {
    title: "علاجات الوجه", tagline: "عناية مخصصة لبشرة مشرقة",
    description: "علاجات الوجه الطبية لدينا تتجاوز العلاجات التقليدية. تجمع بين التنظيف العميق والتقشير والاستخراج والترطيب والسيروم المستهدفة، علاجاتنا مخصصة لكل نوع بشرة ومشكلة. من الهيدرافيشيل الشهير إلى التقشير السريري، كل علاج يعطي نتائج مرئية.",
    benefits: ["تنظيف عميق وتنقية المسام", "إشراق فوري للبشرة", "مخصص لنوع بشرتك", "لا فترة توقف لمعظم العلاجات", "دفعة ترطيب للبشرة الجافة", "تقليل الدهون والبثور", "تحضير البشرة للمناسبات الخاصة"],
    idealCandidate: ["أي شخص يرغب في بشرة أصح وأنقى", "تحضير البشرة للمناسبات", "أصحاب البشرة الدهنية أو المعرضة لحب الشباب", "البشرة الجافة والمجففة", "الصيانة المنتظمة للبشرة"],
    steps: [
      { title: "تحليل البشرة", desc: "تقييم مفصل لنوع بشرتك ومخاوفك وحساسياتك." },
      { title: "التنظيف العميق", desc: "تنظيف بدرجة احترافية لإزالة الشوائب والمكياج والدهون الزائدة." },
      { title: "تطبيق العلاج", desc: "مزيج مخصص من التقشير والسيروم والأقنعة والعلاج بالضوء LED." },
      { title: "الترطيب والحماية", desc: "طبقة ترطيب نهائية وواقي شمس لبشرة محمية ومتوهجة." },
    ],
    recovery: "لا فترة توقف لمعظم العلاجات. البشرة قد تبدو محمرة قليلاً لـ 1-2 ساعة.",
    results: "توهج ونعومة فوريان. العلاجات الشهرية المنتظمة تنتج تحسناً تراكمياً طويل الأمد.",
    risks: "مخاطر منخفضة جداً. احمرار مؤقت محتمل. أخبرنا دائماً عن الحساسيات قبل العلاج.",
    pricing: "اسعارنا مميزه ويتم تحديدها بعد التقييم ",
    faqs: [
      { q: "كم مرة يجب أن أحصل على علاج وجه؟", a: "كل 4-6 أسابيع لصحة بشرة مثالية. أكثر تكراراً لمشاكل محددة." },
      { q: "هل يمكنني وضع مكياج بعدها؟", a: "نوصي بالانتظار 6-12 ساعة للسماح لبشرتك بامتصاص فوائد العلاج بالكامل." },
    ],
    image: "/images/new.jpg",
  },
  "acne-treatment": {
    title: "علاج حب الشباب", tagline: "بشرة نقية وثقة متجددة",
    description: "برامج علاج حب الشباب الطبية لدينا تعالج حب الشباب من جذوره — سواء كان هرمونياً أو بكتيرياً أو التهابياً. باستخدام مزيج من العلاجات السريرية والمنتجات الطبية والإجراءات المتقدمة مثل العلاج بالضوء الأزرق والتقشير الكيميائي، ننشئ بروتوكولات مخصصة تزيل البثور الموجودة وتمنع ظهورها مستقبلاً.",
    benefits: ["يستهدف حب الشباب من الجذر", "يقلل البثور النشطة بسرعة", "يمنع ظهور بثور مستقبلية", "يقلل ندوب حب الشباب", "يحسن ملمس البشرة العام", "يقلل إنتاج الدهون الزائدة", "يعزز الثقة بالنفس"],
    idealCandidate: ["المراهقون والبالغون المصابون بحب الشباب المستمر", "من يعانون حب الشباب الهرموني", "من لم يستجيبوا للمنتجات التجارية", "حب الشباب الكيسي أو الالتهابي", "حب الشباب مع مخاوف الندوب"],
    steps: [
      { title: "التقييم الشامل", desc: "تحليل البشرة لتحديد نوع حب الشباب وشدته ومحفزاته ووجود ندوب." },
      { title: "خطة العلاج", desc: "بروتوكول مخصص يجمع علاجات العيادة مع منتجات العناية المنزلية." },
      { title: "العلاجات السريرية", desc: "جلسات منتظمة تشمل التقشير الكيميائي والعلاج بالضوء الأزرق والاستخراج حسب الحاجة." },
      { title: "بروتوكول الصيانة", desc: "روتين عناية طويل الأمد وفحوصات دورية للحفاظ على بشرة نقية." },
    ],
    recovery: "معظم العلاجات بفترة توقف ضئيلة. التقشير الكيميائي قد يسبب 2-3 أيام تقشر خفيف. العلاج بالضوء بدون فترة توقف.",
    results: "تحسن مرئي خلال 2-4 أسابيع. تنقية كبيرة في 8-12 أسبوعاً. برنامج الصيانة يحافظ على البشرة نقية.",
    risks: "ضئيلة. جفاف مؤقت أو تقشر أو فترة تطهير ممكنة في أول أسبوعين.",
    pricing: "اسعارنا مميزه ويتم تحديدها بعد التقييم ",
    faqs: [
      { q: "هل سيعود حب الشباب؟", a: "مع الصيانة المناسبة وروتين العناية، النتائج تدوم طويلاً. نعلمك كيف تحافظ على بشرة نقية." },
      { q: "متى سأرى النتائج؟", a: "معظم المرضى يرون تحسناً خلال 2-4 أسابيع. التنقية الكاملة عادة تتطلب 8-12 أسبوعاً." },
    ],
    image: "/images/before-after-skin-1.jpg",
  },
  "scar-treatment": {
    title: "علاج الندبات", tagline: "تقليل الندبات وتعزيز الثقة",
    description: "خيارات علاج الندبات المتقدمة لدينا تجمع طرق متعددة لتقليل مظهر الندبات الناتجة عن حب الشباب أو الجراحة أو الحروق أو الإصابات بشكل ملحوظ. باستخدام الليزر الجزئي والميكرونيدلينج وPRP وكريمات الندوب المتخصصة، ننشئ خطط علاج شاملة تحسن ملمس ولون ومظهر الندبات بشكل كبير.",
    benefits: ["تقليل كبير في وضوح الندبات", "تحسين ملمس البشرة في المناطق المتندبة", "خيارات علاج متعددة متاحة", "مناسب للندوب القديمة والجديدة", "يمكن علاج الندوب في أي مكان بالجسم", "يحفز إعادة تشكيل البشرة الطبيعية", "نتائج تدريجية وتراكمية"],
    idealCandidate: ["أصحاب ندوب حب الشباب (ندبة الثلج، الصندوقية، المتدحرجة)", "الندوب الجراحية", "ندوب الحروق", "ندوب الإصابات أو الصدمات", "علامات التمدد", "ندوب الجدرة أو المتضخمة"],
    steps: [
      { title: "تقييم الندبة", desc: "تحليل مفصل لنوع الندبة وعمقها وعمرها وموقعها لتحديد أفضل نهج علاجي." },
      { title: "اختيار العلاج", desc: "مزيج مخصص من العلاجات: الليزر الجزئي والميكرونيدلينج وPRP والتحرير تحت الجلدي أو الفيلر حسب الحاجة." },
      { title: "الدورة العلاجية", desc: "سلسلة علاجات بفاصل 4-6 أسابيع لإعادة تشكيل الكولاجين وتجديد البشرة المثلى." },
      { title: "الصيانة والمتابعة", desc: "بروتوكول عناية بعد العلاج وتقييمات متابعة لتتبع التحسن." },
    ],
    recovery: "3-7 أيام حسب شدة العلاج. احمرار وتورم خفيف طبيعيان. حماية صارمة من الشمس مطلوبة خلال دورة العلاج.",
    results: "تحسن 30-70% في مظهر الندبة حسب نوعها ونهج العلاج. النتائج تستمر في التحسن لـ 3-6 أشهر بعد آخر جلسة.",
    risks: "احمرار مؤقت وتورم وقشور. تغيرات في التصبغ ممكنة في أنواع البشرة الداكنة (تُدار بالبروتوكولات المناسبة).",
    pricing: "اسعارنا مميزه ويتم تحديدها بعد التقييم ",
    faqs: [
      { q: "هل يمكن علاج الندوب القديمة؟", a: "نعم! رغم أن الندوب الأحدث تستجيب أسرع، حتى الندوب التي عمرها سنوات يمكن تحسينها بشكل ملحوظ." },
      { q: "كم عدد الجلسات المطلوبة؟", a: "عادة 3-6 جلسات حسب شدة الندبة. بعض التحسن مرئي بعد الجلسة الأولى." },
    ],
    image: "/images/before-after-laser-1.jpg",
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const dataMap = lang === "ar" ? serviceDataAR : serviceDataEN;
  const data = dataMap[slug || ""] || null;

  if (!data) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            {lang === "ar" ? "الخدمة غير موجودة" : "Service Not Found"}
          </h1>
          <Button asChild>
            <Link to="/services">{t("sd.allServices")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const s = data;
  const image = s.image;

  return (
    <div className="pt-[72px]">
      {/* Hero with image */}
      <section className="relative py-24 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={image} alt={s.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(214,85%,8%)]/95 to-[hsl(214,85%,8%)]/70" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {t("sd.allServices")}
            </Link>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white">{s.title}</h1>
            <p className="mt-4 text-xl text-white/60">{s.tagline}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-blue hover:opacity-90 text-primary-foreground shadow-blue rounded-xl px-7">
                <Link to="/book-appointment"><CalendarDays className="w-5 h-5 me-2" />{t("hero.bookBtn")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 rounded-xl px-7">
                <Link to="/consultation"><Stethoscope className="w-5 h-5 me-2" />{t("sd.askDoctor")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        {/* Description */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">{t("sd.aboutProcedure")}</h2>
          <p className="text-muted-foreground leading-relaxed">{s.description}</p>
        </motion.section>

        {/* Service image */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-16 rounded-2xl overflow-hidden shadow-card-hover">
          <img src={image} alt={s.title} className="w-full h-64 md:h-80 object-cover" loading="lazy" />
        </motion.div>

        {/* Benefits */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">{t("sd.benefits")}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {s.benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/60 hover:shadow-card transition-shadow">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Ideal Candidate */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">{t("sd.idealCandidate")}</h2>
          <ul className="space-y-2">
            {s.idealCandidate.map((c, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.04 }}
                className="flex items-center gap-3 text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {c}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Steps */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">{t("sd.procedureSteps")}</h2>
          <div className="space-y-4">
            {s.steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}
                className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-card transition-shadow">
                <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-blue flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Info grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Clock, labelKey: "sd.recovery", text: s.recovery },
            { icon: CheckCircle2, labelKey: "sd.expectedResults", text: s.results },
            { icon: Shield, labelKey: "sd.risksSafety", text: s.risks },
            { icon: CalendarDays, labelKey: "sd.pricing", text: s.pricing },
          ].map(({ icon: Icon, labelKey, text }, i) => (
            <motion.div key={labelKey} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.06 }}
              className="p-6 rounded-xl border border-border bg-card hover:shadow-card transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground">{t(labelKey)}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">{t("sd.faq")}</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {s.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-5">
                <AccordionTrigger className="text-left font-medium text-foreground">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.section>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
          className="text-center p-10 rounded-2xl bg-gradient-hero">
          <h3 className="text-2xl font-display font-bold text-white">{t("sd.readyToStart")}</h3>
          <p className="mt-2 text-white/60">{t("sd.bookConsultation")}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-blue hover:opacity-90 text-primary-foreground shadow-blue rounded-xl px-7">
              <Link to="/book-appointment"><CalendarDays className="w-5 h-5 me-2" />{t("hero.bookBtn")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 rounded-xl px-7">
              <Link to="/consultation"><Stethoscope className="w-5 h-5 me-2" />{t("sd.askDoctor")}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetail;
