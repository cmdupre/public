const add = (num1, num2) => parseFloat(num1) + parseFloat(num2);
const sub = (num1, num2) => parseFloat(num1) - parseFloat(num2);
const mul = (num1, num2) => parseFloat(num1) * parseFloat(num2);
const div = (num1, num2) => parseFloat(num1) / parseFloat(num2);

function zeroDisplay()
{
    displayText.textContent = '0';
}

function operate(operator, num1, num2)
{
    if (operator === '+') return add(num1, num2);
    if (operator === '-') return sub(num1, num2);
    if (operator === '*') return mul(num1, num2);
    if (operator === '/') return div(num1, num2);
    return NaN;
}

function doOperations()
{
    let result = 0;

    let items = displayText
        .textContent
        .trimEnd()
        .split(' ');

    while (items.length >= 3)
    {
        // divide by zero check
        if (items[1] === '/' && items[2] === '0')
        {
            displayText.textContent = "The answer to everything is 42!";
            return;
        }

        result = operate(items[1], items[0], items[2]);

        items.splice(0, 3, result);
    }

    displayText.textContent = result;
}

function clickButton(button)
{
    // todo: refactor this long function

    if (button === 'clear')
    {
        zeroDisplay();
        return;
    }

    if (button === 'backspace')
    {
        let text = displayText
            .textContent
            .trimEnd();

        text = text
            .substring(0, text.length - 1)
            .trimEnd();

        if (text.length < 1)
        {
            zeroDisplay();
            return;
        }

        displayText.textContent = text;
        return;
    }

    if (button === '=')
    {
        doOperations();
        return;
    }

    // replace zero if user clicked a number button
    if (displayText.textContent === '0' && !isNaN(parseInt(button)))
    {
        displayText.textContent = button;
        return;
    }

    // don't allow consecutive operations, replace operator
    if (isNaN(parseInt(button)) && isNaN(parseInt(displayText.textContent.slice(-1))))
    {
        displayText.textContent = 
            displayText.textContent.substring(0, displayText.textContent.length - 2) +
            button + ' ';

        return;
    }

    // make sure decimal isn't selected more than once
    if (button === '.')
    {
        let text = displayText
            .textContent
            .trimEnd()
            .split(' ');
        
        text = text[text.length - 1];

        if (text.includes('.'))
        {
            return;
        }
    }

    // add a space before and after text if user clicked an operation button
    // otherwise, just append the selected number or decimal point
    displayText.textContent +=
        (isNaN(parseInt(button)) && (button !== '.') ? ' ' : '') +
        button +
        (isNaN(parseInt(button)) && (button !== '.') ? ' ' : '');
}

const displayText = document.querySelector('.calculator-display-text');
zeroDisplay();