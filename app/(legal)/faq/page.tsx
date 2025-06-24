'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { HelpCircle, ChevronRight } from "lucide-react"
import Link from "next/link"

const faqData = {
  General: [
    {
      question: "What if I just had renovation work done?",
      answer: "You can request a specialized cleaning for post-renovation. Our team uses industrial-grade equipment for deep cleaning."
    },
    {
      question: "Do I get a discount if I'm a frequent customer?",
      answer: "Yes! We offer loyalty discounts for monthly and yearly subscribers."
    },
  ],
  "Trust & Safety": [
    {
      question: "Are my emails safe and private?",
      answer: "Absolutely. We do not read, store, or share your email contents. Everything is encrypted and deleted after processing."
    },
  ],
  Services: [
    {
      question: "Can I snooze WhatsApp messages too?",
      answer: "Currently we support emails only, but WhatsApp integration is on our roadmap."
    },
  ],
  Billing: [
    {
      question: "Do you offer refunds?",
      answer: "Refunds are only available if the subscription was not used. Contact support within 7 days."
    },
  ],
  "About SnoozeMail": [
    {
      question: "What is SnoozeMail?",
      answer: "SnoozeMail lets you forward any email to an address like 2min@snoozemail.in, and we'll resend it to you after that time — like a personal reminder bot."
    },
    {
      question: "How do I use it?",
      answer: "Just forward any email to us. We'll parse the time and send it back to you after the delay."
    },
    {
      question: "What formats are supported?",
      answer: "- 2min@snoozemail.in → in 2 minutes\n- 5h@snoozemail.in → in 5 hours\n- tomorrow@snoozemail.in → next day same time\n- nextweek@snoozemail.in → 7 days later\nWe also support snoozedemos+2min@gmail.com in the demo version."
    },
    {
      question: "Do you read or store my emails?",
      answer: "No. We store the message temporarily just to send it back to you, then delete it. You can read our Privacy Policy for details."
    },
    {
      question: "Do I need an account?",
      answer: "You can use it without signing up in demo mode. But to manage reminders, see history, and upgrade plans, we recommend signing up."
    },
    {
      question: "What are the plan limits?",
      answer: "- Free: 10 reminders per month\n- Pro: 100 reminders\n- Team: Unlimited reminders + collaboration"
    },
    {
      question: "Can I unsubscribe from reminders?",
      answer: "Yes. Just click the unsubscribe link in any reminder email or manage reminders from your dashboard."
    },
    {
      question: "Who built this?",
      answer: "SnoozeMail is an indie project by kishore kumar. We'd love your feedback."
    }
  ]
}

export default function FAQPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground px-4 sm:px-6 lg:px-8 py-12">
      {/* Sidebar Table of Contents */}
      <aside className="md:w-64 lg:w-72 md:pr-8 md:sticky md:top-24 md:self-start md:h-[calc(100vh-6rem)] md:overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ChevronRight className="w-5 h-5 text-primary" />
            Table of Contents
          </h2>
          <ul className="space-y-3">
            {Object.keys(faqData).map((section) => (
              <motion.li 
                key={section}
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a 
                  href={`#${section.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 py-1"
                >
                  <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  {section}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </aside>

      {/* Main FAQ Content */}
      <main className="md:flex-1 space-y-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
            <HelpCircle className="text-primary w-8 h-8" />
            <span>Questions? We&apos;ve got answers.</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Can&apos;t find what you&apos;re looking for? <Link href="/contact" className="text-primary hover:underline">Contact our support</Link>
          </p>
        </motion.div>

        {Object.entries(faqData).map(([section, questions]) => (
          <motion.section 
            key={section}
            id={section.toLowerCase().replace(/\s+/g, '-')}
            className="scroll-mt-24 group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <h2 className="text-2xl font-semibold">{section}</h2>
            </div>
            
            <Accordion type="multiple" className="w-full space-y-2">
              {questions.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.005 }}
                >
                  <AccordionItem 
                    value={`item-${section}-${index}`}
                    className="border rounded-lg px-4 hover:border-primary transition-colors"
                  >
                    <AccordionTrigger className="hover:no-underline py-4 text-left font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground whitespace-pre-line">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.section>
        ))}

        <div className="pt-8 border-t">
          <h3 className="text-lg font-medium mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            We&apos;re here to help. Get in touch with our support team.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Support
            <ChevronRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  )
}