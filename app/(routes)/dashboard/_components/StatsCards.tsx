import { fetchFormStats } from "@/actions/form.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import React from "react";

const StatsCards = (props: {
  data: Awaited<ReturnType<typeof fetchFormStats>>;
  loading: boolean;
}) => {
  const { loading, data } = props;
  return (
    <div
      className="grid gap-4 
        sm:grid-cols-2 
        md:grid-cols-4 
          lg:grid-cols-2
           xl:grid-cols-4"
    >
      <Card className="bg-white hover:shadow-md transition-all duration-200 hover:border-secondary/30 border-l-4 border-l-secondary/20">
        <CardHeader className="pb-2">
          <CardDescription>Total Forms</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Loader className="h-[36px] animate-spin" />
            ) : (
              data?.totalForms || 0
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            All forms created on your account
          </div>
        </CardContent>
      </Card>

      {/* {Responses} */}
      <Card className="bg-white hover:shadow-md transition-all duration-200 hover:border-secondary/30 border-l-4 border-l-primary/20">
        <CardHeader className="pb-2">
          <CardDescription>Total Responses</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Loader className="h-[36px] animate-spin" />
            ) : (
              data?.totalResponses || 0
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Responses submitted for your forms
          </div>
        </CardContent>
      </Card>

      {/* {Conversion Rate} */}
      <Card className="bg-white hover:shadow-md transition-all duration-200 hover:border-secondary/30 border-l-4 border-l-secondary/40">
        <CardHeader className="pb-2">
          <CardDescription>Conversion Rate</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Loader className="h-[36px] animate-spin" />
            ) : (
              <>{data?.conversionRate?.toFixed(1)}%</>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            % of views that resulted in responses
          </div>
        </CardContent>
      </Card>

      {/* {Engagement Rate} */}
      <Card className="bg-white hover:shadow-md transition-all duration-200 hover:border-secondary/30 border-l-4 border-l-primary/40">
        <CardHeader className="pb-2">
          <CardDescription>Engagement Rate</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Loader className="h-[36px] animate-spin" />
            ) : (
              <>{data?.engagementRate?.toFixed(1)}%</>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            % of forms that received responses
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
