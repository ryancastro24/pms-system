import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TruckLoaderDataType } from "@/pages/TrucksComponent";

// Define chart colors based on status
const chartConfig = {
  available: {
    label: "Available",
    color: "hsl(var(--chart-1))",
  },
  maintenance: {
    label: "Maintenance",
    color: "hsl(var(--chart-2))",
  },
  onhold: {
    label: "On Hold",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function BarChartComponent({ trucks }: TruckLoaderDataType) {
  // Process the trucks data to generate the chart data
  const chartData = trucks.reduce<
    Record<
      string,
      { month: string; available: number; maintenance: number; onhold: number }
    >
  >((acc, truck) => {
    // Extract month name from dateDeployed
    const date = new Date(truck.date_deployed);
    const month = date.toLocaleString("default", { month: "long" }); // Converts to "January", "February", etc.

    // Initialize the month object if it doesn't exist
    if (!acc[month]) {
      acc[month] = {
        month,
        available: 0,
        maintenance: 0,
        onhold: 0,
      };
    }

    // Increment the count based on truck's status
    if (truck.status === "Available") {
      acc[month].available += 1;
    } else if (truck.status === "Maintainance") {
      acc[month].maintenance += 1;
    } else if (truck.status === "On Hold") {
      acc[month].onhold += 1;
    }

    return acc;
  }, {});

  // Convert the result to an array
  const formattedChartData = Object.values(chartData);

  // Get the months in sorted order
  const months = formattedChartData
    .map((data) => new Date(`${data.month} 1`))
    .sort((a, b) => a.getMonth() - b.getMonth());

  // Get the year from the first or last month (assuming all data is for the same year)
  const year = new Date().getFullYear();

  // Determine the period for the description (Jan-Jun or Jul-Dec)
  const isFirstHalf = months[0].getMonth() <= 5; // Check if the first month is from Jan-Jun

  const periodDescription = isFirstHalf
    ? `January - June ${year}`
    : `July - December ${year}`;

  console.log(formattedChartData);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Trucks Per Month Summary</CardTitle>
        <CardDescription>{periodDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={formattedChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="available"
              fill={chartConfig.available.color} // Color based on status
              radius={4}
            />
            <Bar
              dataKey="maintenance"
              fill={chartConfig.maintenance.color} // Color based on status
              radius={4}
            />
            <Bar
              dataKey="onhold"
              fill={chartConfig.onhold.color} // Color based on status
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing truck statistics for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
