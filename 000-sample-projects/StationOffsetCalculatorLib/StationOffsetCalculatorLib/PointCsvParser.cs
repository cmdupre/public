using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using System.Windows;

namespace StationOffsetCalculator
{
    public class PointCsvParser : CsvParser
    { 
        public PointCsvParser([NotNull] string filename) 
            : base(filename)
        {
            Indices.Add((int)Index.Easting);
            Indices.Add((int)Index.Northing);
        }

        public enum Index
        {
            Easting,
            Northing
        }

        [NotNull]
        public IEnumerable<Point> Points
        {
            get
            {
                var points = new Dictionary<Point, string>();

                string line;

                while ((line = File?.ReadLine()) != null)
                {
                    if (!TryParseLine(line, out Point point))
                    {
                        continue;
                    }

                    if (points.ContainsKey(point))
                    {
                        continue;
                    }

                    points.Add(point, string.Empty);

                    yield return point;
                }
            }
        }

        public bool TryParseLine([NotNull] string line, out Point point)
        {
            point = new Point(0, 0);

            string cleanLine = line.Sanitize();

            string[] fields = cleanLine.Split(',');

            if (fields.Length < 2)
            {
                return false;
            }

            // Determine columns for easting and northing if this is a header line that
            // contains these two values.
            if (cleanLine.Contains(Index.Easting) && cleanLine.Contains(Index.Northing))
            {
                Indices[(int)Index.Easting] = GetIndex(fields, Index.Easting);
                Indices[(int)Index.Northing] = GetIndex(fields, Index.Northing);

                return false;
            }

            if (!double.TryParse(fields[Indices[(int)Index.Easting]], out double easting))
            {
                return false;
            }

            if (!double.TryParse(fields[Indices[(int)Index.Northing]], out double northing))
            {
                return false;
            }

            point = new Point(easting, northing);

            return true;
        }

        private static int GetIndex([NotNull] IReadOnlyList<string> fields, Index index)
        {
            string indexString = index.ToString().ToLower();

            for (var i = 0; i < fields.Count; i++)
            {
                if (fields[i] == indexString)
                {
                    return i;
                }
            }

            throw new ArgumentException("Invalid parameters - field not found.");
        }
    }
}
