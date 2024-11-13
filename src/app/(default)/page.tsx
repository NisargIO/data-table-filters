import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Commit {
  commitHash: string;
  totalRuntimesCollected: number;
  firstAdded: string;
  lastAdded: string;
}

// Remove "use client" and make it async
export default async function CommitsPage() {
  // Fetch data server-side
  let commits: Commit[] = [];
  try {
    const res = await fetch("http://localhost:42069/api/v1/apm/commits?apiKey=faire-staging-apm", {
      cache: "no-store",
    });
    commits = await res.json();
  } catch (error) {}

  return (
    <Suspense fallback={<Skeleton />}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {commits.map((commit) => (
          <Link href={`/${commit.commitHash}`} key={commit.commitHash}>
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardHeader>
                <CardTitle className="text-sm font-mono">{commit.commitHash}</CardTitle>
                <div className="flex flex-col gap-2">
                  <p>Total Runtimes: {commit.totalRuntimesCollected.toLocaleString()}</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>First: {new Date(commit.firstAdded).toLocaleString()}</p>
                    <p>Last: {new Date(commit.lastAdded).toLocaleString()}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </Suspense>
  );
}
