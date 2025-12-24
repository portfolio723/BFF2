
"use client";

import { motion } from "framer-motion";
import { Shield, Book, Users, FileText, IndianRupee, AlertTriangle, Scale, Mail } from "lucide-react";

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

export default function TermsOfUsePage() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border text-sm font-medium mb-4 shadow-sm">
            <Shield className="w-4 h-4" />
            Terms of Use
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
            BFF — Books For Foster
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            A Social Initiative by PixelKLiQ
          </p>
        </motion.div>

        <div className="space-y-8">
            <Section icon={Book} title="1. Introduction">
                <p>
                    BFF (Books For Foster) is a non-commercial, community-driven initiative by PixelKLiQ aimed at improving access to education through shared learning resources.
                    By using this platform, you agree to these Terms of Use.
                </p>
            </Section>

            <Section icon={Users} title="2. Nature of the Initiative">
                <ul>
                    <li>BFF does not sell books</li>
                    <li>BFF does not operate as a lending or profit-making service</li>
                    <li>Participation is voluntary and community-based</li>
                </ul>
            </Section>

            <Section icon={IndianRupee} title="3. Book Sharing Models">
                <h4>A. Free Book Sharing</h4>
                <ul>
                    <li>Donated books are shared without any charge</li>
                    <li>Books may be returned to continue the sharing cycle</li>
                </ul>
                <h4>B. High-Value Book Lending (BFF Plus)</h4>
                <ul>
                    <li>Certain high-cost books are made available under a shared lending model</li>
                    <li>A nominal maintenance contribution (e.g., ₹50) may be collected</li>
                    <li>This amount is not for profit. It supports handling, circulation, and sustainability</li>
                </ul>
            </Section>
            
             <Section icon={Users} title="4. Borrower Responsibilities">
                <ul>
                    <li>Books must be returned within the agreed period</li>
                    <li>Borrowers must take reasonable care of books</li>
                    <li>Loss or severe damage may require replacement or recovery</li>
                    <li>A refundable security deposit may be collected for select books</li>
                </ul>
            </Section>

            <Section icon={FileText} title="5. Digital Content & Copyright">
                <ul>
                    <li>Only open-source, public-domain, Creative Commons, or government-published content is allowed</li>
                    <li>Pirated or copyrighted PDFs are strictly prohibited</li>
                    <li>Any content shared unintentionally will be removed upon request</li>
                </ul>
            </Section>
            
            <Section icon={AlertTriangle} title="6. Limitation of Liability">
                 <p>
                    BFF and PixelKLiQ act only as facilitators and are not responsible for misuse, outcomes, or third-party actions.
                </p>
            </Section>
            
             <Section icon={Scale} title="7. Governing Law">
                 <p>
                    These terms are governed by the laws of India.
                </p>
            </Section>

            <Section icon={Mail} title="8. Contact">
                <p>
                    For queries or copyright concerns, please email us at: <a href="mailto:booksforfosters@gmail.com" className="text-primary hover:underline">booksforfosters@gmail.com</a>
                </p>
            </Section>
        </div>
      </div>
    </section>
  );
}
