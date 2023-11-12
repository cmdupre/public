using System.Windows;

namespace StationOffsetCalculator
{
    public class LineIntersection
    {
        public bool IsOnSegment { get; }

        public bool IsNotOnSegment => !IsOnSegment;

        public Point Location { get; }

        public LineIntersection(Point point1, Point point2, Point position)
        {
            Location = FindLineIntersection(point1, point2, position);

            IsOnSegment = IntersectIsOnSegment(point1, point2);
        }

        private static Point FindLineIntersection(Point point1, Point point2, Point position)
        {
            double x;
            double y;

            // Check for vertical line.
            if ((point2.X - point1.X).IsAlmostZero())
            {
                x = point2.X;

                y = position.Y;

                return new Point(x, y);
            }

            // Check for horizontal line.
            if ((point2.Y - point1.Y).IsAlmostZero())
            {
                x = position.X;

                y = point2.Y;

                return new Point(x, y);
            }

            // Formulas are equal where lines intersect.
            // y = mx + b
            // mx1 + b1 = mx2 + b2
            // mx1 - mx2 = b2 - b1
            // x = (b2 - b1) / (m1 - m2)

            double m1 = CalculatorHelper.Slope(point1, point2);

            double m2 = CalculatorHelper.PerpendicularSlope(point1, point2);

            double b1 = CalculatorHelper.YIntercept(point2, m1);

            double b2 = CalculatorHelper.YIntercept(position, m2);

            x = (b2 - b1) / (m1 - m2);

            y = (m1 * x) + b1;

            return new Point(x, y);
        }

        private bool IntersectIsOnSegment(Point point1, Point point2)
        {
            // a-----p-----------b
            // ab = ap + pb

            Vector ab = point1 - point2;

            Vector ap = point1 - Location;

            Vector pb = Location - point2;

            return (ab.Length - ap.Length - pb.Length).IsAlmostZero();
        }
    }
}
