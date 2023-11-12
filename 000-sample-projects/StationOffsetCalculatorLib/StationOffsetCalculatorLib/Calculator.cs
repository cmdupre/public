using JetBrains.Annotations;
using System.Collections.Generic;
using System.Linq;
using System.Windows;

namespace StationOffsetCalculator
{
    public class Calculator
    {
        public bool IsValid { get; }

        public double Station { get; }

        public double Offset { get; }

        [CanBeNull] public LineIntersection Intersection { get; }

        [CanBeNull] public NearestPoint NearestPoint { get; }

        public Calculator([NotNull] IReadOnlyList<Point> polyline, Point position)
        {
            if (polyline.Count < 2)
            {
                return;
            }

            for (var i = 1; i < polyline.Count; i++)
            {
                Point point1 = polyline[i - 1];
                Point point2 = polyline[i];

                var intersection = new LineIntersection(point1, point2, position);

                if (intersection.IsNotOnSegment)
                {
                    continue;
                }

                double offset = 
                    CalculatorHelper.VectorLength(intersection.Location, position);

                if (IsValid && offset >= Offset)
                {
                    continue;
                }

                IsValid = true;

                Offset = offset;

                var subLine = new List<Point>();

                subLine.AddRange(polyline.Take(i));

                subLine.Add(intersection.Location);

                Station = CalculatorHelper.LineLength(subLine);

                Intersection = intersection;

                if (Offset.IsAlmostZero())
                {
                    break;
                }
            }

            if (IsValid)
            {
                return;
            }

            NearestPoint = NearestPoint.Find(polyline, position);

            Offset = NearestPoint.Offset;

            Station = NearestPoint.Station;

            Intersection = null;

            IsValid = true;
        }
    }
}
