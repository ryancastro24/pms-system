import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";
import { TruckLoaderDataType } from "@/pages/TrucksComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartConfig = {
  trucks: {
    label: "Trucks",
  },
  available: {
    label: "Available",
    color: "hsl(var(--chart-1))",
  },
  maintainance: {
    label: "Maintainance",
    color: "hsl(var(--chart-2))",
  },
  "on hold": {
    label: "On Hold",
    color: "hsl(var(--chart-3))",
  },
} as const;

// Type for chartConfig values
type ChartConfigValue = {
  label: string;
  color?: string;
};

// Type guard to check for the existence of `color`
function hasColor(
  config: ChartConfigValue
): config is ChartConfigValue & { color: string } {
  return typeof config.color === "string";
}

const date = new Date();
export default function PieChartComponent({ trucks }: TruckLoaderDataType) {
  // Group trucks by their status and count them
  const statusCounts = trucks.reduce<
    Record<string, { status: string; statusCount: number }>
  >((acc, truck) => {
    const { status } = truck;

    // Initialize status count if it doesn't exist
    if (!acc[status]) {
      acc[status] = {
        status,
        statusCount: 0,
      };
    }

    // Increment the count for the corresponding status
    acc[status].statusCount += 1;

    return acc;
  }, {});

  // Create newTruckData array
  const newTruckData = Object.values(statusCounts).map((statusGroup) => {
    const statusKey =
      statusGroup.status.toLowerCase() as keyof typeof chartConfig;
    const chartEntry = chartConfig[statusKey];
    return {
      status: statusGroup.status,
      statusCount: statusGroup.statusCount,
      fill: hasColor(chartEntry) ? chartEntry.color : "gray", // Safely access `color`
    };
  });

  console.log(newTruckData);

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Truck Status</CardTitle>
        <CardDescription>
          All Trucks Status {date.getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={newTruckData}
              dataKey="statusCount"
              label={(entry) => `${entry.status}: ${entry.statusCount}`}
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              paddingAngle={5}
              labelLine={true} // Ensure label lines extend
            >
              {newTruckData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing truck statistics for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
