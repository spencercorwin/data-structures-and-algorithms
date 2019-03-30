
class Stack {
    constructor() {
        // Items at 0 index are bottom of stack
        this.stack = [];
    }

    push(item) {
        this.stack.push(item);
    }

    pop() {
        if (this.stack.length === 0) {
            return undefined;
        } else {
            const result = this.stack.pop();
            return result;
        }
    }

    //Display top element on stack
    peek() {
        return this.stack[this.stack.length - 1];
    }

    length() {
        return this.stack.length;
    }
}

const stack = new Stack();
[10, 3, 4, 7, 10, 363].forEach(item => stack.push(item));

console.log(stack.peek()); // Should be 363
console.log(stack.length()); // Should be 6
console.log(stack.pop()); // Should be 363
console.log(stack.peek()); // Should be 10