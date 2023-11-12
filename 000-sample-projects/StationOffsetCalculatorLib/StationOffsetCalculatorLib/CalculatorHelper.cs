using JetBrains.Annotations;
using System.Collections.Generic;
using System.Windows;

namespace StationOffsetCalculator
{
    public static class CalculatorHelper
    {
        public static double VectorLength(Point point1, Point point2)
        {
            // distance = sqrt((x2 - x1)^2 + (y2 - y1)^2)

            Vector vector = point1 - point2;

            return vector.Length;
        }

        public static double LineLength([NotNull] IReadOnlyList<Point> points)
        {
            var length = 0.0;

            for (var i = 1; i < points.Count; i++)
            {
                length += VectorLength(points[i - 1], points[i]);
            }

            return length;
        }

        public static double Slope(Point point1, Point point2)
        {
            // dy / dx

            return (point2.Y - point1.Y) / (point2.X - point1.X);
        }

        public static double PerpendicularSlope(Point point1, Point point2)
        {
            // Inverse reciprocal of slope.
            // -dx / dy

            return (point1.X - point2.X) / (point2.Y - point1.Y);
        }

        public static double YIntercept(Point point, double slope)
        {
            // b = y - mx

            return point.Y - (slope * point.X);
        }
    }
}
