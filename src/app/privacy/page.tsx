
"use client";

import { motion } from "framer-motion";
import { User, Database, Link as LinkIcon, CheckSquare, RefreshCw, FileText } from "lucide-react";

const Section = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="bg-card p-6 lg:p-8 rounded-2xl border border-border shadow-sm"
    >
        <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Icon className="w-5 h-5 text-secondary-foreground" />
            </div>
            <h2 className="font-heading text-xl font-semibold">{title}</h2>
        </div>
        <div className="prose prose-sm prose-p:text-muted-foreground prose-ul:text-muted-foreground prose-li:marker:text-muted-foreground max-w-none">
            {children}
        </div>
    </motion.div>
);

export default function PrivacyPolicyPage() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border text-sm font-medium mb-4 shadow-sm">
            <FileText className="w-4 h-4" />
            Privacy Policy
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
            Your Privacy Matters
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            How we collect, use, and protect your information at Books For Fosters.
          </p>
        </motion.div>

        <div className="space-y-8">
            <Section icon={User} title="1. Information We Collect">
                <p>We collect minimal information to facilitate book sharing and communication, such as:</p>
                <ul>
                    <li>Name</li>
                    <li>Email</li>
                    <li>Phone number (if required for pickup/delivery)</li>
                </ul>
            </Section>

            <Section icon={Database} title="2. How We Use Information">
                <p>Your information is used solely for the following purposes:</p>
                <ul>
                    <li>To connect donors and borrowers.</li>
                    <li>To communicate about book availability, returns, and pickups.</li>
                    <li>To improve our community-driven initiative.</li>
                </ul>
            </Section>
            
            <Section icon={Database} title="3. Data Protection">
                <ul>
                    <li>Your personal data is not sold, rented, or shared with third parties for marketing purposes.</li>
                    <li>Data is stored securely and accessed only by authorized personnel when required for operational purposes.</li>
                </ul>
            </Section>
            
             <Section icon={LinkIcon} title="4. Third-Party Links">
                 <p>
                    BFF may link to external educational resources. We are not responsible for the content or privacy practices of these external sites.
                </p>
            </Section>

            <Section icon={CheckSquare} title="5. Consent">
                <p>
                    By using this platform, you consent to this Privacy Policy and our Terms of Use.
                </p>
            </Section>
            
             <Section icon={RefreshCw} title="6. Updates">
                 <p>
                    This policy may be updated periodically to improve transparency or ensure compliance. We encourage you to review it from time to time.
                </p>
            </Section>
        </div>
      </div>
    </section>
  );
}
