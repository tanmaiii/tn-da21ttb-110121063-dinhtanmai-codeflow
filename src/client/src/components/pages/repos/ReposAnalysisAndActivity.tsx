import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IRepos } from '@/interfaces/repos';
import { IconCode, IconGitCommit, IconGitPullRequest } from '@tabler/icons-react';
import CodeAnalysis from './code-analysis/CodeAnalysis';
import Commits from './commits/Commits';
import PullRequests from './pull-requests/PullRequests';

interface PullRequestsAndCommitsProps {
  repos: IRepos;
}

export default function ReposAnalysisAndActivity({ repos }: PullRequestsAndCommitsProps) {
  return (
    <Card>
      <Tabs defaultValue="code-analysis" className="w-full">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="code-analysis" className="flex items-center gap-2">
              <IconCode className="size-4" />
              Code Analysis
            </TabsTrigger>
            <TabsTrigger value="pull-requests" className="flex items-center gap-2">
              <IconGitPullRequest className="size-4" />
              Pull Requests
            </TabsTrigger>
            <TabsTrigger value="commits" className="flex items-center gap-2">
              <IconGitCommit className="size-4" />
              Commits
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="min-h-[300px]">
          <TabsContent value="code-analysis" className="space-y-4">
            <CodeAnalysis repos={repos} />
          </TabsContent>

          <TabsContent value="pull-requests" className="space-y-4">
            <PullRequests repos={repos} />
          </TabsContent>

          <TabsContent value="commits" className="space-y-4">
            <Commits repos={repos} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
