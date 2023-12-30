from sympy import symbols
from sympy.solvers import solve

x = symbols('x')

eq = input('Enter equation: 0 = ')

solution = solve(eq, x)

for s in solution:
    print("x =", s)