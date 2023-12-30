digits = input("enter a decimal number to convert: ")

exponent = int(len(digits)-1)

n = float(digits)

numerator = int(n * 10**exponent)

denominator = 10**exponent

percent = n * 100

print("the decimal is ", n)
print("the percent is ", percent)
print("the fraction is ", numerator, '/', denominator)
