export type Question = {
    id: string;
    category: "aptitude" | "html" | "css" | "javascript" | "python" | "java" | "cpp" | "technical" | "sql" | "software-dev" | "cloud" | "networking" | "c-programming";
    text: string;
    options: string[];
    correctAnswer: number; // 0-indexed
    explanation: string;
};

export const questions: Question[] = [
    // --- HTML Questions ---
    {
        id: "html-1",
        category: "html",
        text: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Text Making Language"
        ],
        correctAnswer: 0,
        explanation: "HTML stands for Hyper Text Markup Language. It is the standard markup language for creating Web pages."
    },
    {
        id: "html-2",
        category: "html",
        text: "Choose the correct HTML element for the largest heading:",
        options: ["<heading>", "<h6>", "<h1>", "<head>"],
        correctAnswer: 2,
        explanation: "<h1> defines the most important heading. <h6> defines the least important heading."
    },
    {
        id: "html-3",
        category: "html",
        text: "Which character is used to indicate an end tag?",
        options: ["^", "/", "<", "*"],
        correctAnswer: 1,
        explanation: "End tags are distinguished from start tags by the forward slash (/) before the tag name, e.g., </p>."
    },
    {
        id: "html-4",
        category: "html",
        text: "How can you open a link in a new tab/browser window?",
        options: ["<a href='url' target='new'>", "<a href='url' target='_blank'>", "<a href='url' new>", "<a href='url' target='window'>"],
        correctAnswer: 1,
        explanation: "The target='_blank' attribute specifies that the linked document should open in a new tab or window."
    },
    {
        id: "html-5",
        category: "html",
        text: "Which of these elements are all <table> elements?",
        options: ["<table>, <tr>, <tt>", "<table>, <tr>, <td>", "<thead>, <body>, <tr>", "<table>, <head>, <tfoot>"],
        correctAnswer: 1,
        explanation: "<table> defines the table, <tr> defines a table row, and <td> defines a table cell (data)."
    },

    // --- CSS Questions ---
    {
        id: "css-1",
        category: "css",
        text: "What does CSS stand for?",
        options: [
            "Colorful Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets"
        ],
        correctAnswer: 2,
        explanation: "CSS stands for Cascading Style Sheets. It describes how HTML elements are to be displayed on screen, paper, or in other media."
    },
    {
        id: "css-2",
        category: "css",
        text: "Which HTML attribute is used to define inline styles?",
        options: ["class", "style", "font", "styles"],
        correctAnswer: 1,
        explanation: "The 'style' attribute is used to specify inline styles for an element."
    },
    {
        id: "css-3",
        category: "css",
        text: "Which is the correct CSS syntax?",
        options: ["body {color: black;}", "{body;color:black;}", "body:color=black;", "{body:color=black;}"],
        correctAnswer: 0,
        explanation: "CSS syntax consists of a selector and a declaration block: selector {property: value;}."
    },
    {
        id: "css-4",
        category: "css",
        text: "How do you insert a comment in a CSS file?",
        options: ["// this is a comment", "/* this is a comment */", "' this is a comment", "// this is a comment //"],
        correctAnswer: 1,
        explanation: "CSS comments start with /* and end with */."
    },
    {
        id: "css-5",
        category: "css",
        text: "Which property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "background-image"],
        correctAnswer: 2,
        explanation: "The background-color property sets the background color of an element."
    },

    // --- JavaScript Questions ---
    {
        id: "js-1",
        category: "javascript",
        text: "Inside which HTML element do we put the JavaScript?",
        options: ["<script>", "<javascript>", "<js>", "<scripting>"],
        correctAnswer: 0,
        explanation: "The <script> tag is used to define client-side JavaScript."
    },
    {
        id: "js-2",
        category: "javascript",
        text: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        options: [
            "<script href='xxx.js'>",
            "<script name='xxx.js'>",
            "<script src='xxx.js'>",
            "<script file='xxx.js'>"
        ],
        correctAnswer: 2,
        explanation: "The 'src' attribute of the <script> tag specifies the URL of an external script file."
    },
    {
        id: "js-3",
        category: "javascript",
        text: "How do you write 'Hello World' in an alert box?",
        options: ["msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');"],
        correctAnswer: 3,
        explanation: "The alert() method displays an alert box with a specified message and an OK button."
    },
    {
        id: "js-4",
        category: "javascript",
        text: "How do you create a function in JavaScript?",
        options: ["function = myFunction()", "function myFunction()", "function:myFunction()", "create myFunction()"],
        correctAnswer: 1,
        explanation: "A JavaScript function is defined with the function keyword, followed by a name, followed by parentheses()."
    },
    {
        id: "js-5",
        category: "javascript",
        text: "how can you add a comment in a JavaScript?",
        options: ["'This is a comment", "<!--This is a comment-->", "//This is a comment", "*This is a comment"],
        correctAnswer: 2,
        explanation: "Single line comments in JavaScript start with //."
    },

    // --- Aptitude Questions ---
    {
        id: "apt-1",
        category: "aptitude",
        text: "Find the missing number in the series: 2, 6, 12, 20, 30, ?",
        options: ["40", "42", "44", "46"],
        correctAnswer: 1,
        explanation: "The pattern is: 1*2=2, 2*3=6, 3*4=12, 4*5=20, 5*6=30, 6*7=42."
    },
    {
        id: "apt-2",
        category: "aptitude",
        text: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
        options: ["120 metres", "180 metres", "324 metres", "150 metres"],
        correctAnswer: 3,
        explanation: "Speed = 60*(5/18) m/sec = 50/3 m/sec. Length of Train = (Speed x Time) = (50/3) * 9 = 150 metres."
    },
    {
        id: "apt-3",
        category: "aptitude",
        text: "The sum of ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
        options: ["4 years", "8 years", "10 years", "None of these"],
        correctAnswer: 0,
        explanation: "Let the ages be x, x+3, x+6, x+9, x+12. Sum = 5x + 30 = 50. 5x = 20. x = 4."
    },
    {
        id: "apt-4",
        category: "aptitude",
        text: "A father is said to his son, 'I was as old as you are at the present at the time of your birth'. If the father's age is 38 years now, the son's age five years back was:",
        options: ["14 years", "19 years", "33 years", "38 years"],
        correctAnswer: 0,
        explanation: "Let son's present age be x. (38-x) = x => 2x = 38 => x = 19. Age 5 years back = 19-5 = 14."
    },
    {
        id: "apt-5",
        category: "aptitude",
        text: "A is two years older than B who is twice as old as C. If the total of the ages of A, B and C be 27, the how old is B?",
        options: ["7", "8", "9", "10"],
        correctAnswer: 3,
        explanation: "Let C's age be x. Then B's age = 2x. A's age = 2x + 2. (2x+2) + 2x + x = 27 => 5x = 25 => x = 5. B's age = 2*5 = 10."
    },

    // --- C Language Questions ---
    {
        id: "c-1",
        category: "c-programming",
        text: "Who is known as the father of C Language?",
        options: ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Guido van Rossum"],
        correctAnswer: 1,
        explanation: "Dennis Ritchie created the C programming language at Bell Labs in 1972."
    },
    {
        id: "c-2",
        category: "c-programming",
        text: "Which of the following is the correct syntax to print a message in C?",
        options: ["cout << 'Hello';", "System.out.println('Hello');", "printf('Hello');", "print('Hello');"],
        correctAnswer: 2,
        explanation: "printf() is the standard library function in C for formatted output."
    },
    {
        id: "c-3",
        category: "c-programming",
        text: "What is the size of an int data type in a 32-bit compiler?",
        options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
        correctAnswer: 2,
        explanation: "On a standard 32-bit compiler, an integer (int) typically occupies 4 bytes of memory."
    },
    {
        id: "c-4",
        category: "c-programming",
        text: "Which operator is used to access the address of a variable?",
        options: ["*", "&", "->", "."],
        correctAnswer: 1,
        explanation: "The '&' (address-of) operator is used to get the memory address of a variable."
    },
    {
        id: "c-5",
        category: "c-programming",
        text: "What is a pointer in C?",
        options: ["A keyword used to create variables", "A variable that stores the address of another variable", "A variable that stores the value of another variable", "None of the above"],
        correctAnswer: 1,
        explanation: "A pointer is a variable that stores the memory address of another variable."
    },

    // --- Extended Aptitude Questions ---
    {
        id: "apt-6",
        category: "aptitude",
        text: "Logical Reasoning: Statement: All roads are waters. Some waters are boats. Conclusion: I. Some boats are roads. II. All waters are boats.",
        options: ["Only conclusion I follows", "Only conclusion II follows", "Either I or II follows", "Neither I nor II follows"],
        correctAnswer: 3,
        explanation: "From the statements, there is no direct relation established between boats and roads. Thus, neither conclusion definitely follows."
    },
    {
        id: "apt-7",
        category: "aptitude",
        text: "Directions: A man walks 5 km toward South and then turns to the right. After walking 3 km he turns to the left and walks 5 km. Now in which direction is he from the starting place?",
        options: ["West", "South", "North-East", "South-West"],
        correctAnswer: 3,
        explanation: "He goes South (5km), turns Right (West), turns Left (South). He is South-West of start."
    },
    {
        id: "apt-8",
        category: "aptitude",
        text: "Blood Relations: Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?",
        options: ["His own", "His son's", "His father's", "His nephew's"],
        correctAnswer: 1,
        explanation: "Since he has no siblings, 'my father's son' is himself. 'That man's father is [me]'. So it's his son."
    },
    {
        id: "apt-9",
        category: "aptitude",
        text: "Coding-Decoding: If MADRAS is coded as NBESBT, how is BOMBAY coded?",
        options: ["CPNCBZ", "CPNCBX", "CPOCBZ", "CQOCBZ"],
        correctAnswer: 0,
        explanation: "Request shift +1 logic: M->N, A->B, D->E... B->C, O->P, M->N, B->C, A->B, Y->Z."
    },
    {
        id: "apt-10",
        category: "aptitude",
        text: "Number Series: 7, 10, 8, 11, 9, 12, ... What next?",
        options: ["7", "10", "12", "13"],
        correctAnswer: 1,
        explanation: "Series: +3, -2, +3, -2, +3... Next is 12 - 2 = 10."
    }
];
