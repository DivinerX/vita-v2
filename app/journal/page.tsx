"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { motion } from "framer-motion";
import { TJournal } from "@/types/journal";
import api from "@/config/axios";
import { toast } from "sonner";
export default function JournalPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentEntry, setCurrentEntry] = useState("");
  const [entries, setEntries] = useState<TJournal[]>([
    {
      id: "1",
      user_id: "1",
      created_at: new Date().toISOString(),
      content: "Feeling more energetic today after three days of following my new diet plan. My afternoon slump seems less severe, though I still had some anxiety before my meeting. The breathing exercise helped.",
      reflection: "I notice positive progress in your energy levels—that's a big win! Your consistent diet changes are showing results. For the pre-meeting anxiety, you're already using great coping strategies. Consider adding a 5-minute meditation specifically before stressful events to further reduce those anxious moments."
    },
    {
      id: "2",
      user_id: "1",
      created_at: new Date().toISOString(),
      content: "Struggled with sleep again last night. Took almost an hour to fall asleep, and woke up twice. Feeling tired today, which made sticking to my exercise plan difficult. I did manage a 10-minute walk at lunch though.",
      reflection: "Sleep challenges can be frustrating, but I'm impressed you still prioritized movement with your lunch walk! That shows real commitment. Based on your pattern, we might want to adjust your evening routine—perhaps shifting your exercise earlier and adding a calming tea ritual before bed could help with those sleep disruptions."
    }
  ]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      try {
        const response = await api.get("/journal");
        setEntries(response.data.data);
      } catch (error) {
        console.error("Failed to fetch journals:", error);
        toast.error("Failed to fetch journals");
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  const handleSaveEntry = async () => {
    if (!currentEntry.trim()) return;

    const response = await api.post("/journal", {
      content: currentEntry,
    });

    console.log(response);
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  if (!mounted) return null;

  return (
    <AnimatedGradientBackground className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div 
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/dashboard">
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-blue-200/30 dark:bg-blue-800/30 rounded-full blur-xl"></div>
              <ArrowLeft className="h-5 w-5 relative z-10" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Your Private Haven</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="mb-8 shadow-lg border-0 overflow-hidden relative bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-sm">
            <div className="absolute right-0 top-0 w-40 h-40 bg-gradient-to-bl from-purple-200/20 to-blue-200/20 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full blur-xl"></div>
            <div className="absolute left-0 bottom-0 w-40 h-40 bg-gradient-to-tr from-indigo-200/20 to-green-200/20 dark:from-indigo-900/20 dark:to-green-900/20 rounded-full blur-xl"></div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-xl">What's on your mind today?</CardTitle>
              <CardDescription>
                Your thoughts are safe—encrypted & yours alone.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Textarea
                placeholder="Write freely about your feelings, health, or whatever you'd like to reflect on..."
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                rows={8}
                className="resize-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:bg-white dark:focus:bg-gray-800 transition-all"
              />
            </CardContent>
            <CardFooter className="flex justify-between relative z-10">
              <p className="text-sm text-muted-foreground">
                <PenLine className="inline h-4 w-4 mr-1" />
                Your journal helps track your wellness journey
              </p>
              <Button 
                onClick={handleSaveEntry}
                disabled={!currentEntry.trim()}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md"
              >
                Save & Reflect
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <div className="space-y-6">
          <motion.h2 
            className="text-xl font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Previous Entries
          </motion.h2>

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  <Card className="overflow-hidden shadow-md border-0 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-sm">
                    <CardHeader className="pb-2 bg-card relative">
                      <div className="h-6 w-48 bg-muted rounded animate-pulse" />
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      <div className="h-4 w-full bg-muted rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                      <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                    </CardContent>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-t border-green-200 dark:border-green-800/30">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                        <div className="space-y-2 flex-1">
                          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                          <div className="h-4 w-full bg-muted rounded animate-pulse" />
                          <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : entries.length === 0 ? (
            <motion.div 
              className="text-center p-8 bg-muted rounded-lg"
            >
              <p className="text-muted-foreground">No journal entries yet. Start writing to track your wellness journey!</p>
            </motion.div>
          ) : (
            entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden shadow-md border-0 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-sm">
                  <CardHeader className="pb-2 bg-card relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-200/20 dark:bg-indigo-800/20 rounded-full blur-xl"></div>
                    <CardTitle className="text-lg">{formatDate(new Date(entry.created_at!))}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 whitespace-pre-wrap">
                    {entry.content}
                  </CardContent>
                  {entry.reflection && (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-t border-green-200 dark:border-green-800/30">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 p-2 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800/50 dark:to-green-700/50 flex items-center justify-center mt-1">
                          <PenLine className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-green-800 dark:text-green-400 mb-1">Emma's Reflection</h4>
                          <p className="text-sm text-green-700 dark:text-green-300">{entry.reflection}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))
          )}
        </div>
        
        <motion.footer 
          className="mt-8 text-center text-sm text-muted-foreground pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 w-32 h-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent rounded-full"></div>
            Your thoughts matter—they're the seeds of your transformation.
          </div>
        </motion.footer>
      </div>
    </AnimatedGradientBackground>
  );
}