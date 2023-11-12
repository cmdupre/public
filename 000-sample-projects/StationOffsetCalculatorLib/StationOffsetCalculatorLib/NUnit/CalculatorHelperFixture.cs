using System.Collections.Generic;
using NUnit.Framework;
using System.Windows;

namespace StationOffsetCalculator.NUnit
{
    [TestFixture]
    internal sealed class CalculatorHelperFixture
    {
        [Test]
        public void ReturnsExpectedVectorLength()
        {
            var point1 = new Point(0, 0);
            var point2 = new Point(10,0);

            double length = CalculatorHelper.VectorLength(point1, point2);

            Assert.AreEqual(10, length);
        }

        [Test]
        public void ReturnsExpectedLineLength()
        {
            var points = new List<Point>()
            {
                new Point(0, 0),
                new Point(10, 0),
                new Point(20, 0),
            };

            double length = CalculatorHelper.LineLength(points);

            Assert.AreEqual(20, length);
        }

        [Test]
        public void CalculatesExpectedSlope()
        {
            var point1 = new Point(0, 0);
            var point2 = new Point(2, 1);

            double result = CalculatorHelper.Slope(point1, point2);

            Assert.That(result, Is.EqualTo(0.5).Within(1e-12));
        }

        [Test]
        public void CalculatesExpectedPerpendicularSlope()
        {
            var point1 = new Point(0, 0);
            var point2 = new Point(2, 1);

            double result = CalculatorHelper.PerpendicularSlope(point1, point2);

            Assert.That(result, Is.EqualTo(-2).Within(1e-12));
        }

        [Test]
        public void CalculatesExpectedYIntercept()
        {
            var point1 = new Point(-2, -1);

            double result = CalculatorHelper.YIntercept(point1, 0.5);

            Assert.That(result, Is.EqualTo(0).Within(1e-12));
        }
    }
}
