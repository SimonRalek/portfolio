import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, MapPin } from "lucide-react";
import { fadeInUp } from "@/lib/framer-animations";
import { personalInfo } from "@/data/portfolio-data";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import AnimatedSection from "./AnimatedSection";
import { FaLinkedinIn, FaGithub, FaTwitter, FaDribbble } from "react-icons/fa";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Form submission handler
  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Social media links
  const socialLinks = [
    { icon: <FaLinkedinIn />, href: personalInfo.social.linkedin, label: "LinkedIn" },
    { icon: <FaGithub />, href: personalInfo.social.github, label: "GitHub" },
    { icon: <FaTwitter />, href: personalInfo.social.twitter, label: "Twitter" },
    { icon: <FaDribbble />, href: personalInfo.social.dribbble, label: "Dribbble" },
  ];

  return (
    <AnimatedSection 
      id="contact" 
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 relative"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Contact Me
          <span className="block w-24 h-1 bg-primary dark:bg-blue-400 mx-auto mt-4"></span>
        </motion.h2>
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
          <motion.div
            className="md:w-2/5"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg h-full">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Get In Touch</h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                I'm interested in freelance opportunities, especially ambitious or large projects. If you have any questions or just want to say hi, feel free to contact me.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-primary dark:text-blue-400 mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-gray-800 dark:text-white font-medium">Email</h4>
                    <a 
                      href={`mailto:${personalInfo.email}`} 
                      className="text-primary dark:text-blue-400 hover:underline"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-primary dark:text-blue-400 mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-gray-800 dark:text-white font-medium">Location</h4>
                    <p className="text-gray-600 dark:text-gray-300">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Connect With Me</h4>
                
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <a 
                      key={index}
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-primary dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="md:w-3/5"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Send Me a Message</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 dark:text-gray-300">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 dark:text-gray-300">Subject</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 dark:text-gray-300">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
