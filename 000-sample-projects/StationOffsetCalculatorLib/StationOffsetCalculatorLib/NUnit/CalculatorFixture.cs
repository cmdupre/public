using NUnit.Framework;
using System.Collections.Generic;
using System.Windows;

namespace StationOffsetCalculator.NUnit
{
    [TestFixture]
    internal sealed class CalculatorFixture
    {
        private static readonly List<Point> s_Polyline = new List<Point>()
        {
            new Point(0, 0),
            new Point(100, 0),
            new Point(150,50),
            new Point(200,0),
            new Point(300,0),
            new Point(300,100),
        };

        //                              300,100
        //                                 |
        //                                 |
        //               150,50            |
        //                 /\              |
        //                /  \             |
        //               /    \            |
        //   ___________/      \___________|
        //
        // 0,0      100,0      200,0     300,0

        [TestCase(301, -1, 341.42135623730951, 1.4142135623730952)]
        public void FindsExtraCreditSolution(
            double easting, double northing, double station, double offset)
        {
            var position = new Point(easting, northing);

            var calculator = new Calculator(s_Polyline, position);

            Assert.IsTrue(calculator.IsValid);
            Assert.That(calculator.Station, Is.EqualTo(station).Within(1e-12), "Station");
            Assert.That(calculator.Offset, Is.EqualTo(offset).Within(1e-12), "Offset");
        }

        [TestCase(301, 101, 241.42135623730951, 142.83556979968259)]
        [TestCase(300, -1, 341.42135623730951, 1)]
        [TestCase(0, -50, 0, 50)]
        [TestCase(150, 51, 392.42135623730951, 150)]
        [TestCase(150, 49, 170.0035713374682, 0.70710678118654757)]
        [TestCase(201, 1, 242.42135623730951, 1)]
        [TestCase(290, 9, 331.42135623730951, 9)]
        [TestCase(290, 11, 352.42135623730951, 10)]
        [TestCase(101, 0, 100.70710678118655, 0.70710678118654757)]
        [TestCase(-1, 0, 341.42135623731, 301)]
        public void FindsCorrectSolutionForEdgeCases(
            double easting, double northing, double station, double offset)
        {
            var position = new Point(easting, northing);

            var calculator = new Calculator(s_Polyline, position);

            Assert.IsTrue(calculator.IsValid);
            Assert.That(calculator.Station, Is.EqualTo(station).Within(1e-12), "Station");
            Assert.That(calculator.Offset, Is.EqualTo(offset).Within(1e-12), "Offset");
        }

        [TestCase(0, 0, 0)]
        [TestCase(100, 0, 100)]
        [TestCase(150, 50, 170.71067811865476)]
        [TestCase(200, 0, 241.42135623730951)]
        [TestCase(300, 0, 341.42135623730951)]
        [TestCase(300, 100, 441.42135623730951)]
        public void FindsCorrectSolutionForSamePointsAsLine(double easting, double northing, double station)
        {
            var position = new Point(easting, northing);

            var calculator = new Calculator(s_Polyline, position);

            Assert.IsTrue(calculator.IsValid);
            Assert.AreEqual(station, calculator.Station, "Station");
            Assert.AreEqual(0, calculator.Offset, "Offset");
        }

        [TestCase(50, 0, 50)]
        [TestCase(75, 0, 75)]
        [TestCase(125, 25, 135.35533905932738)]
        [TestCase(175, 25, 206.06601717798214)]
        [TestCase(250, 0, 291.42135623730952)]
        [TestCase(300, 50, 391.42135623730952)]
        public void FindsCorrectSolutionForPointsOnLine(double easting, double northing, double station)
        {
            var position = new Point(easting, northing);

            var calculator = new Calculator(s_Polyline, position);

            Assert.IsTrue(calculator.IsValid);
            Assert.AreEqual(station, calculator.Station, "Station");
            Assert.AreEqual(0, calculator.Offset, "Offset");
        }

        [TestCase(50, 50, 50, 50)]
        [TestCase(50, -50, 50, 50)]
        [TestCase(125, 20, 131.81980515339464, 3.5355339059327378)]
        [TestCase(125, 30, 138.89087296526012, 3.5355339059327378)]
        [TestCase(175, 20, 209.60155108391487, 3.5355339059327378)]
        [TestCase(175, 30, 202.5304832720494, 3.5355339059327378)]
        [TestCase(250, 50, 291.42135623730952, 50)]
        [TestCase(250, -50, 291.42135623730952, 50)]
        [TestCase(275, 75, 416.42135623730952, 25)]
        [TestCase(325, 75, 416.42135623730952, 25)]
        public void FindsCorrectSolutionForPointsNearLine(
            double easting, double northing, double station, double offset)
        {
            var position = new Point(easting, northing);

            var calculator = new Calculator(s_Polyline, position);

            Assert.IsTrue(calculator.IsValid);
            Assert.AreEqual(station, calculator.Station, "Station");
            Assert.AreEqual(offset, calculator.Offset, "Offset");
        }

        [Test]
        public void ReturnsValidInstance()
        {
            var calculator = new Calculator(s_Polyline, new Point(0, 0));

            Assert.NotNull(calculator);
        }
    }
}
