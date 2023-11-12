using JetBrains.Annotations;
using System;
using System.Text;

namespace StationOffsetCalculator
{
    public static class Extensions
    {
        public static bool Contains([NotNull] this string test, PointCsvParser.Index index)
        {
            string indexString = index.ToString().ToLower();

            return test.Contains(indexString);
        }

        [NotNull]
        public static string Sanitize([NotNull] this string line)
        {
            var sb = new StringBuilder();

            foreach (var c in line)
            {
                if (char.IsLetterOrDigit(c) || c == '.' || c == ',' || c == '-')
                {
                    sb.Append(c);
                }
            }

            return sb.ToString().ToLower();
        }

        public static bool IsAlmostZero(this double value)
        {
            return Math.Abs(value) < 1e-12;
        }
    }
}
