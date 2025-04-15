
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Which plan is right for me?",
    answer: "The Free plan is perfect for individuals looking to try our platform. The Pro plan is ideal for small teams or growing businesses that need more advanced features. The Business plan is designed for marketing teams and agencies with sophisticated needs. Enterprise is customized for large organizations with specific requirements. Still unsure? Contact our sales team for a personalized recommendation."
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. If you downgrade, the new lower rate will apply at the start of your next billing cycle."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, all paid plans come with a free trial. You can explore all the features of your chosen plan before being charged. No credit card is required to start the free trial of our Pro or Business plans."
  },
  {
    question: "What happens when I hit my monthly limits?",
    answer: "When you approach your monthly limits, you'll receive a notification. If you exceed your limits, you'll have the option to upgrade to a higher plan or wait until your limits reset at the start of your next billing cycle."
  },
  {
    question: "Do you offer discounts for nonprofits or educational institutions?",
    answer: "Yes, we offer special discounts for nonprofits, educational institutions, and startups. Please contact our sales team to learn more about our discount programs."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards including Visa, Mastercard, and American Express. For Enterprise plans, we also offer invoice payment options."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact our support team within 14 days of your purchase for a full refund."
  }
];

const PricingFAQ = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our plans and pricing
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default PricingFAQ;
