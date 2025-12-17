
"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, BookOpen, Truck, Gift, UserCheck } from "lucide-react";


const faqs = [
    {
        category: "General Questions",
        icon: HelpCircle,
        questions: [
            {
                q: "What is Books For Fosters?",
                a: "Books For Fosters is a community-driven platform that makes reading more accessible and affordable. We allow users to rent books for free (paying only for delivery), buy books at low prices, and donate their pre-loved books to give them a new life."
            },
            {
                q: "How is this different from a traditional library?",
                a: "While we share the goal of promoting reading, our model is a bit different. We are a peer-to-peer inspired platform where the books are sourced from community donations. Our rental model focuses on minimal costs (just delivery), and we also offer the option to buy books outright."
            },
            {
                q: "Is your service available across India?",
                a: "Currently, our services are primarily focused on Hyderabad, Telangana. We are working on expanding to other cities in the near future. Stay tuned for updates!"
            }
        ]
    },
    {
        category: "Renting & Buying Books",
        icon: BookOpen,
        questions: [
            {
                q: "How does the book rental work?",
                a: "Simply find a book you'd like to read, select the 'Rent' option, and check out. You only pay for the delivery fee. The standard rental period is 30 days. After that, you can either return it or extend the rental period if possible."
            },
            {
                q: "What are the delivery charges?",
                a: "Our standard delivery charge is a flat rate of ₹40 for orders within Hyderabad. We offer free delivery for all orders with a subtotal over ₹500."
            },
             {
                q: "What is the condition of the books?",
                a: "Most of our books are pre-loved and come from donations. We have a quality check process to ensure all books are in readable condition. Conditions are typically listed on the book's detail page (e.g., 'Like New', 'Good', 'Fair')."
            },
            {
                q: "What happens if I damage or lose a rented book?",
                a: "We understand that accidents can happen. If a book is significantly damaged or lost, you will be charged the 'Buy' price of the book. Please contact our support team for assistance."
            }
        ]
    },
    {
        category: "Donating Books",
        icon: Gift,
        questions: [
            {
                q: "How can I donate my books?",
                a: "It's easy! Just go to our 'Donate' page, fill out the form with details about the books you wish to donate, and schedule a pickup. Our team will come to your address to collect them, free of charge."
            },
            {
                q: "What kind of books can I donate?",
                a: "We accept books from almost all genres and for all age groups, including fiction, non-fiction, academic, and children's books. We only ask that the books are in a readable condition, without major damage like torn pages or excessive markings."
            },
            {
                q: "What happens to the books I donate?",
                a: "Once collected, your books are cataloged and added to our platform, making them available for other community members to rent or buy. This helps extend the life of each book and promotes sustainable reading."
            }
        ]
    },
    {
        category: "Account & KYC",
        icon: UserCheck,
        questions: [
            {
                q: "Why is KYC verification required?",
                a: "KYC (Know Your Customer) verification is required for users who wish to rent books. This helps us build a trusted and secure community, ensuring that our books are handled responsibly and returned on time."
            },
            {
                q: "What documents are needed for KYC?",
                a: "Our primary method for KYC is through Aadhar e-KYC, which is a quick and secure online process. We do not store your Aadhar number, and the process is used only for identity verification."
            },
            {
                q: "Can I use the platform without completing KYC?",
                a: "Yes, absolutely. You can still browse our entire collection, buy books, and donate your own books without completing KYC. The verification is only mandatory for renting."
            }
        ]
    }
]

export default function FAQPage() {
  return (
    <section className="pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto my-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
            Have Questions? We Have Answers.
          </h1>
          <p className="text-muted-foreground mt-3">
            Find answers to common questions about renting, donating, and using our platform.
            If you can't find your answer here, feel free to contact us.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
            {faqs.map(category => (
                <div key={category.category} className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-6 pb-4 border-b"
                    >
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                            <category.icon className="w-6 h-6 text-foreground" />
                        </div>
                        <h2 className="font-heading text-2xl font-semibold">{category.category}</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Accordion type="single" collapsible className="w-full space-y-2">
                           {category.questions.map((faq, index) => (
                             <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6">
                                <AccordionTrigger className="text-left hover:no-underline">{faq.q}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                   {faq.a}
                                </AccordionContent>
                             </AccordionItem>
                           ))}
                        </Accordion>
                    </motion.div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
