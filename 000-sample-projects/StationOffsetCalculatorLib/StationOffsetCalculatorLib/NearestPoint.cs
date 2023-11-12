using JetBrains.Annotations;
using System.Collections.Generic;
using System.Linq;
using System.Windows;

namespace StationOffsetCalculator
{
    public class NearestPoint
    {
        public double Offset { get; }

        public double Station { get; }

        public Point Location { get; }

        private NearestPoint(double offset, double station, Point location)
        {
            Offset = offset;

            Station = station;

            Location = location;
        }

        [NotNull]
        public static NearestPoint Find([NotNull] IReadOnlyList<Point> points, Point position)
        {
            double offset = double.MaxValue;

            var saveIndex = 0;

            for (var i = 0; i < points.Count; i++)
            {
                Point point = points[i];

                double distance = 
                    CalculatorHelper.VectorLength(point, position);

                if (distance > offset)
                {
                    continue;
                }

                offset = distance;

                saveIndex = i;
            }

            double station = 
                CalculatorHelper.LineLength(points.Take(saveIndex + 1).ToList());

            Point location = points[saveIndex];

            return new NearestPoint(offset, station, location);
        }
    }
}
