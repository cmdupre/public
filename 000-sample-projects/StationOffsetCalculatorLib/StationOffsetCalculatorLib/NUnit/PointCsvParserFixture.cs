using JetBrains.Annotations;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Windows;

namespace StationOffsetCalculator.NUnit
{
    [TestFixture]
    internal sealed class PointCsvParserFixture
    {
        private static readonly string s_TestPath = Environment.CurrentDirectory;
        private static readonly List<Point> s_Polyline = new List<Point>()
        {
            new Point(1123456.789, 1987654.321),
            new Point(2123456.789, 2987654.321),
            new Point(3123456.789, 3987654.321),
        };

        [Test]
        public void CanParseTestFile()
        {
            var sb = new StringBuilder();

            sb.AppendLine("Easting,Northing");
            sb.AppendLine($"{s_Polyline[0].X:F3},{s_Polyline[0].Y:F3}");
            sb.AppendLine($"{s_Polyline[1].X:F3},{s_Polyline[1].Y:F3}");
            sb.AppendLine($"{s_Polyline[2].X:F3},{s_Polyline[2].Y:F3}");

            string testFile = Path.Combine(s_TestPath, "nunit_test1.csv");

            File.WriteAllText(testFile, sb.ToString());

            var points = new List<Point>();

            using (var parser = new PointCsvParser(testFile))
            {
                points.AddRange(parser.Points);
            }

            File.Delete(testFile);

            Assert.AreEqual(s_Polyline, points);
        }

        [Test]
        public void CanParseFileNoHeader()
        {
            var sb = new StringBuilder();

            sb.AppendLine($"{s_Polyline[0].X:F3},{s_Polyline[0].Y:F3}");
            sb.AppendLine($"{s_Polyline[1].X:F3},{s_Polyline[1].Y:F3}");
            sb.AppendLine($"{s_Polyline[2].X:F3},{s_Polyline[2].Y:F3}");

            string testFile = Path.Combine(s_TestPath, "nunit_test2.csv");

            File.WriteAllText(testFile, sb.ToString());

            var points = new List<Point>();

            using (var parser = new PointCsvParser(testFile))
            {
                points.AddRange(parser.Points);
            }

            File.Delete(testFile);

            Assert.AreEqual(s_Polyline, points);
        }

        [Test]
        public void CanParseFileReverseHeader()
        {
            var sb = new StringBuilder();

            sb.AppendLine("Northing,Easting");
            sb.AppendLine($"{s_Polyline[0].Y:F3},{s_Polyline[0].X:F3}");
            sb.AppendLine($"{s_Polyline[1].Y:F3},{s_Polyline[1].X:F3}");
            sb.AppendLine($"{s_Polyline[2].Y:F3},{s_Polyline[2].X:F3}");

            string testFile = Path.Combine(s_TestPath, "nunit_test3.csv");

            File.WriteAllText(testFile, sb.ToString());

            var points = new List<Point>();

            using (var parser = new PointCsvParser(testFile))
            {
                points.AddRange(parser.Points);
            }

            File.Delete(testFile);

            Assert.AreEqual(s_Polyline, points);
        }

        [Test]
        public void CanParseHeaderWithMoreThanTwoColumns()
        {
            var sb = new StringBuilder();

            sb.AppendLine("Time,Northing,Speed,Easting,Heading");
            sb.AppendLine($",{s_Polyline[0].Y:F3},,{s_Polyline[0].X:F3}");
            sb.AppendLine($",{s_Polyline[1].Y:F3},,{s_Polyline[1].X:F3}");
            sb.AppendLine($",{s_Polyline[2].Y:F3},,{s_Polyline[2].X:F3}");

            string testFile = Path.Combine(s_TestPath, "nunit_test4.csv");

            File.WriteAllText(testFile, sb.ToString());

            var points = new List<Point>();

            using (var parser = new PointCsvParser(testFile))
            {
                points.AddRange(parser.Points);
            }

            File.Delete(testFile);

            Assert.AreEqual(s_Polyline, points);
        }

        [Test]
        public void NoPointsReturnedForLessThanTwoFields()
        {
            var sb = new StringBuilder();

            sb.AppendLine("Easting");
            sb.AppendLine($"{s_Polyline[0].X:F3}");
            sb.AppendLine($"{s_Polyline[1].X:F3}");
            sb.AppendLine($"{s_Polyline[2].X:F3}");

            string testFile = Path.Combine(s_TestPath, "nunit_test5.csv");

            File.WriteAllText(testFile, sb.ToString());

            var points = new List<Point>();

            using (var parser = new PointCsvParser(testFile))
            {
                points.AddRange(parser.Points);
            }

            File.Delete(testFile);

            Assert.AreEqual(0, points.Count);
        }

        [Test]
        public void WillParseIncorrectFieldIfCanConvertToDouble()
        {
            var sb = new StringBuilder();

            sb.AppendLine("Easting,Heading");
            sb.AppendLine($"{s_Polyline[0].X:F3},123.4");
            sb.AppendLine($"{s_Polyline[1].X:F3},123.4");
            sb.AppendLine($"{s_Polyline[2].X:F3},123.4");

            string testFile = Path.Combine(s_TestPath, "nunit_test6.csv");

            File.WriteAllText(testFile, sb.ToString());

            var points = new List<Point>();

            using (var parser = new PointCsvParser(testFile))
            {
                points.AddRange(parser.Points);
            }

            File.Delete(testFile);

            Assert.AreEqual(3, points.Count);
        }

        [Test]
        public void DoesNotAddSamePointToCollection()
        {
            var sb = new StringBuilder();

            sb.AppendLine("Easting,Northing");
            sb.AppendLine($"{s_Polyline[0].X:F3},{s_Polyline[0].Y:F3}");
            sb.AppendLine($"{s_Polyline[1].X:F3},{s_Polyline[1].Y:F3}");
            sb.AppendLine($"{s_Polyline[1].X:F3},{s_Polyline[1].Y:F3}");
            sb.AppendLine($"{s_Polyline[2].X:F3},{s_Polyline[2].Y:F3}");

            string testFile = Path.Combine(s_TestPath, "nunit_test7.csv");

            File.WriteAllText(testFile, sb.ToString());

            var points = new List<Point>();

            using (var parser = new PointCsvParser(testFile))
            {
                points.AddRange(parser.Points);
            }

            File.Delete(testFile);

            Assert.AreEqual(3, points.Count);
        }

        [TestCase("1.2,3.4",        1.2, 3.4)]
        [TestCase("1.2 , 3.4",      1.2, 3.4)]
        [TestCase("  1. 2 , 3 . 4", 1.2, 3.4)]
        [TestCase("  1. 2 , 3 . 4", 1.2, 3.4)]
        [TestCase("1,2",            1.0, 2.0)]
        [TestCase("*1.2/,+3.!4",    1.2, 3.4)]
        [TestCase("-1, -1",        -1.0,-1.0)]
        public void CanParseSimpleCsvLines([NotNull] string line, double easting, double northing)
        {
            bool result;
            Point point;

            using (var parser = new PointCsvParser(string.Empty))
            {
                result = parser.TryParseLine(line, out point);
            }

            Assert.AreEqual(true, result);
            Assert.AreEqual(easting, point.X);
            Assert.AreEqual(northing, point.Y);
        }
    }
}
