import { Card, CardContent } from "@/components/ui/card";
import { useFadeIn } from "@/hooks/use-fade-in";
import {
  ShieldCheckIcon,
  MessageCircleIcon,
  LockIcon,
  MapPinIcon
} from "lucide-react";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  emoji: string;
}

const features: Feature[] = [
  {
    id: "verified",
    icon: <ShieldCheckIcon className="h-8 w-8" />,
    title: "Verified Stays",
    description: "Every property is personally verified for quality and safety standards",
    emoji: "🛏"
  },
  {
    id: "support",
    icon: <MessageCircleIcon className="h-8 w-8" />,
    title: "24/7 Support", 
    description: "Round-the-clock customer support to help you anytime, anywhere",
    emoji: "💬"
  },
  {
    id: "payments",
    icon: <LockIcon className="h-8 w-8" />,
    title: "Secure Payments",
    description: "Your payment information is protected with bank-level security",
    emoji: "🔒"
  },
  {
    id: "experiences",
    icon: <MapPinIcon className="h-8 w-8" />,
    title: "Local Experiences",
    description: "Discover authentic local activities and hidden gems with insider tips",
    emoji: "📍"
  }
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const { ref, fadeInStyle } = useFadeIn({ delay: index * 150 });

  return (
    <Card
      ref={ref}
      style={fadeInStyle}
      className="group border-gray-200 hover:border-dusky-rose transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <CardContent className="p-6 text-center">
        {/* Icon with animation */}
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-dusky-rose to-dusky-thistle rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
          </div>
          {/* Emoji overlay */}
          <div className="absolute -top-2 -right-2 text-2xl bg-peach rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            {feature.emoji}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-dusky-rose transition-colors">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {feature.description}
        </p>
        
        {/* Animated underline */}
        <div className="mt-4 h-1 bg-gradient-to-r from-dusky-rose to-dusky-thistle rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </CardContent>
    </Card>
  );
}

export function WhyChooseUs() {
  const { ref: headerRef, fadeInStyle: headerStyle } = useFadeIn();

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} style={headerStyle} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose MonsoonStay?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to making your travel experience seamless, safe, and unforgettable
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
