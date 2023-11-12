using StationOffsetCalculator;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows;

namespace StationOffsetCalculatorConsole
{
    internal class Program
    {
        private static void Main()
        {
            string filename =
                Path.Combine(Environment.CurrentDirectory, "input.csv");

            Console.WriteLine("Importing csv file: " + filename);

            Console.WriteLine("");

            var parser = new PointCsvParser(filename);

            if (!parser.IsOpen)
            {
                Console.WriteLine("Error opening csv file.");
                return;
            }

            List<Point> polyline = parser.Points.ToList();

            Console.WriteLine("Loaded a polyline with the following points:");

            Console.WriteLine("");

            foreach (var point in polyline)
            {
                Console.WriteLine(point);
            }

            do
            {
                Console.WriteLine("");

                Console.WriteLine("(Ex. 100,200)");
                Console.Write("Enter your position: ");

                string positionInput = Console.ReadLine();

                if (positionInput == null)
                {
                    continue;
                }

                if (!parser.TryParseLine(positionInput, out Point position))
                {
                    Console.WriteLine("");
                    Console.WriteLine("Failed to parse input.");
                    continue;
                }

                Console.WriteLine("");

                Console.WriteLine("Your position is: " + position);

                var calculator = new Calculator(polyline, position);

                Console.WriteLine("");

                Console.WriteLine("Your station is:  " + calculator.Station);
                Console.WriteLine("Your offset is:   " + calculator.Offset);

                // Give a little detail on how station/offset was calculated.
                if (calculator.Intersection != null && calculator.Intersection.IsOnSegment)
                {
                    Console.WriteLine("");
                    Console.WriteLine("Intersection with polyline is: " + calculator.Intersection.Location);
                }
                else if (calculator.NearestPoint != null)
                {
                    Console.WriteLine("");
                    Console.WriteLine("No parallel line solution.");
                    Console.WriteLine("Nearest point is: " + calculator.NearestPoint.Location);
                }

            } while (true);
        }
    }
}
