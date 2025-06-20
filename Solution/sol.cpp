#include <iostream>
#include <vector>
#include <string>
#include <cmath>
#include <stack>
#include <queue>
#include <map>
#include <sstream>
#include <algorithm>

using namespace std;

// Forward declarations
bool hasLeadingZeros(const string& s);
vector<vector<string>> generateSplits(const string& digits);
queue<string> shuntingYard(const vector<string>& tokens);
double evaluatePostfix(queue<string> postfix);
vector<vector<string>> generateParentheticalVariants(const vector<string>& tokens);

struct OpInfo {
    int precedence;
    bool isRightAssociative;
};

map<string, OpInfo> opPrecedence = {
    {"+", {2, false}}, {"-", {2, false}}, {"*", {3, false}},
    {"/", {3, false}}, {"^", {4, true}}, {"(", {0, false}}, {")", {0, false}}
};

// Check for leading zeros in digit groups
bool hasLeadingZeros(const string& s) {
    return s.size() > 1 && s[0] == '0';
}

// Generate all possible splits of digits
vector<vector<string>> generateSplits(const string& digits) {
    vector<vector<string>> splits;
    int n = digits.size();
    for (int mask = 0; mask < (1 << (n-1)); mask++) {
        vector<string> groups;
        int prev = 0;
        for (int i = 0; i < n-1; i++) {
            if (mask & (1 << i)) {
                groups.push_back(digits.substr(prev, i - prev + 1));
                prev = i + 1;
            }
        }
        groups.push_back(digits.substr(prev));
        splits.push_back(groups);
    }
    return splits;
}

// Shunting-yard algorithm to handle parentheses and operator precedence
queue<string> shuntingYard(const vector<string>& tokens) {
    queue<string> outputQueue;
    stack<string> opStack;

    for (const auto& token : tokens) {
        if (isdigit(token[0])) {
            outputQueue.push(token);
        } else if (token == "(") {
            opStack.push(token);
        } else if (token == ")") {
            while (!opStack.empty() && opStack.top() != "(") {
                outputQueue.push(opStack.top());
                opStack.pop();
            }#include <iostream>
#include <vector>
#include <string>
#include <cmath>
#include <stack>
#include <queue>
#include <map>
#include <sstream>
#include <algorithm>

using namespace std;

// Forward declarations
bool hasLeadingZeros(const string& s);
vector<vector<string>> generateSplits(const string& digits);
queue<string> shuntingYard(const vector<string>& tokens);
double evaluatePostfix(queue<string> postfix);
vector<vector<string>> generateParentheticalVariants(const vector<string>& tokens);

struct OpInfo {
    int precedence;
    bool isRightAssociative;
};

map<string, OpInfo> opPrecedence = {
    {"+", {2, false}}, {"-", {2, false}}, {"*", {3, false}},
    {"/", {3, false}}, {"^", {4, true}}, {"(", {0, false}}, {")", {0, false}}
};

// Check for leading zeros in digit groups
bool hasLeadingZeros(const string& s) {
    return s.size() > 1 && s[0] == '0';
}

// Generate all possible splits of digits
vector<vector<string>> generateSplits(const string& digits) {
    vector<vector<string>> splits;
    int n = digits.size();
    for (int mask = 0; mask < (1 << (n-1)); mask++) {
        vector<string> groups;
        int prev = 0;
        for (int i = 0; i < n-1; i++) {
            if (mask & (1 << i)) {
                groups.push_back(digits.substr(prev, i - prev + 1));
                prev = i + 1;
            }
        }
        groups.push_back(digits.substr(prev));
        splits.push_back(groups);
    }
    return splits;
}

// Shunting-yard algorithm to handle parentheses and operator precedence
queue<string> shuntingYard(const vector<string>& tokens) {
    queue<string> outputQueue;
    stack<string> opStack;

    for (const auto& token : tokens) {
        if (isdigit(token[0])) {
            outputQueue.push(token);
        } else if (token == "(") {
            opStack.push(token);
        } else if (token == ")") {
            while (!opStack.empty() && opStack.top() != "(") {
                outputQueue.push(opStack.top());
                opStack.pop();
            }
            opStack.pop();
        } else {
            while (!opStack.empty() && 
                (opPrecedence[opStack.top()].precedence > opPrecedence[token].precedence ||
                (opPrecedence[opStack.top()].precedence == opPrecedence[token].precedence &&
                !opPrecedence[token].isRightAssociative)) &&
                opStack.top() != "(") {
                outputQueue.push(opStack.top());
                opStack.pop();
            }
            opStack.push(token);
        }
    }

    while (!opStack.empty()) {
        outputQueue.push(opStack.top());
        opStack.pop();
    }

    return outputQueue;
}

// Evaluate postfix notation
double evaluatePostfix(queue<string> postfix) {
    stack<double> s;
    while (!postfix.empty()) {
        string token = postfix.front();
        postfix.pop();

        if (isdigit(token[0])) {
            s.push(stod(token));
        } else {
            double b = s.top(); s.pop();
            double a = s.top(); s.pop();

            if (token == "+") s.push(a + b);
            else if (token == "-") s.push(a - b);
            else if (token == "*") s.push(a * b);
            else if (token == "/") {
                if (b == 0) return NAN;
                s.push(a / b);
            }
            else if (token == "^") s.push(pow(a, b));
        }
    }
    return s.empty() ? NAN : s.top();
}

// Generate expressions with parentheses
vector<vector<string>> generateParentheticalVariants(const vector<string>& tokens) {
    vector<vector<string>> variants;
    for (size_t i = 0; i < tokens.size(); i++) {
        if (!isdigit(tokens[i][0])) {  // <-- Fixed line
            vector<string> variant;
            if (i >= 1 && i + 1 < tokens.size()) {
                variant.insert(variant.end(), tokens.begin(), tokens.begin() + i - 1);
                variant.push_back("(");
                variant.push_back(tokens[i-1]);
                variant.push_back(tokens[i]);
                variant.push_back(tokens[i+1]);
                variant.push_back(")");
                variant.insert(variant.end(), tokens.begin() + i + 2, tokens.end());
                variants.push_back(variant);
            }
        }
    }
    return variants;
}

// Main solver function
string findSolution(const string& digits) {
    auto splits = generateSplits(digits);

    for (const auto& groups : splits) {
        if (any_of(groups.begin(), groups.end(), hasLeadingZeros)) continue;

        int m = groups.size() - 1;
        if (m == 0) continue;

        int max_op = pow(5, m);
        for (int op_num = 0; op_num < max_op; op_num++) {
            vector<string> ops;
            int current = op_num;
            for (int j = 0; j < m; j++) {
                int digit = current % 5;
                current /= 5;
                switch (digit) {
                    case 0: ops.push_back("+"); break;
                    case 1: ops.push_back("-"); break;
                    case 2: ops.push_back("*"); break;
                    case 3: ops.push_back("/"); break;
                    case 4: ops.push_back("^"); break;
                }
            }
            reverse(ops.begin(), ops.end());

            string expr;
            for (size_t i = 0; i < groups.size(); i++) {
                expr += groups[i];
                if (i < ops.size()) expr += ops[i];
            }

            vector<string> baseTokens;
            string current_num;
            for (char c : expr) {
                if (isdigit(c)) {
                    current_num += c;
                } else {
                    if (!current_num.empty()) {
                        baseTokens.push_back(current_num);
                        current_num.clear();
                    }
                    baseTokens.push_back(string(1, c));
                }
            }
            if (!current_num.empty()) baseTokens.push_back(current_num);

            auto variants = generateParentheticalVariants(baseTokens);
            variants.push_back(baseTokens);

            for (const auto& tokens : variants) {
                try {
                    auto postfix = shuntingYard(tokens);
                    double result = evaluatePostfix(postfix);
                    if (abs(result - 100) < 1e-6) {
                        string solution;
                        for (const auto& t : tokens) solution += t;
                        return "Solution: " + solution + " = 100";
                    }
                } catch (...) {}
            }
        }
    }
    return "No solution found";
}

int main() {
   for(int i=111111;i<=999999;i++){
    cout<<findSolution(to_string(i))<<endl;
   }

    return 0;
}
            opStack.pop();
        } else {
            while (!opStack.empty() && 
                (opPrecedence[opStack.top()].precedence > opPrecedence[token].precedence ||
                (opPrecedence[opStack.top()].precedence == opPrecedence[token].precedence &&
                !opPrecedence[token].isRightAssociative)) &&
                opStack.top() != "(") {
                outputQueue.push(opStack.top());
                opStack.pop();
            }
            opStack.push(token);
        }
    }

    while (!opStack.empty()) {
        outputQueue.push(opStack.top());
        opStack.pop();
    }

    return outputQueue;
}

// Evaluate postfix notation
double evaluatePostfix(queue<string> postfix) {
    stack<double> s;
    while (!postfix.empty()) {
        string token = postfix.front();
        postfix.pop();

        if (isdigit(token[0])) {
            s.push(stod(token));
        } else {
            double b = s.top(); s.pop();
            double a = s.top(); s.pop();

            if (token == "+") s.push(a + b);
            else if (token == "-") s.push(a - b);
            else if (token == "*") s.push(a * b);
            else if (token == "/") {
                if (b == 0) return NAN;
                s.push(a / b);
            }
            else if (token == "^") s.push(pow(a, b));
        }
    }
    return s.empty() ? NAN : s.top();
}

// Generate expressions with parentheses
vector<vector<string>> generateParentheticalVariants(const vector<string>& tokens) {
    vector<vector<string>> variants;
    for (size_t i = 0; i < tokens.size(); i++) {
        if (!isdigit(tokens[i][0]) {
            vector<string> variant;
            if (i >= 1 && i + 1 < tokens.size()) {
                variant.insert(variant.end(), tokens.begin(), tokens.begin() + i - 1);
                variant.push_back("(");
                variant.push_back(tokens[i-1]);
                variant.push_back(tokens[i]);
                variant.push_back(tokens[i+1]);
                variant.push_back(")");
                variant.insert(variant.end(), tokens.begin() + i + 2, tokens.end());
                variants.push_back(variant);
            }
        }
    }
    return variants;
}

// Main solver function
string findSolution(const string& digits) {
    auto splits = generateSplits(digits);

    for (const auto& groups : splits) {
        if (any_of(groups.begin(), groups.end(), hasLeadingZeros)) continue;

        int m = groups.size() - 1;
        if (m == 0) continue;

        int max_op = pow(5, m);
        for (int op_num = 0; op_num < max_op; op_num++) {
            vector<string> ops;
            int current = op_num;
            for (int j = 0; j < m; j++) {
                int digit = current % 5;
                current /= 5;
                switch (digit) {
                    case 0: ops.push_back("+"); break;
                    case 1: ops.push_back("-"); break;
                    case 2: ops.push_back("*"); break;
                    case 3: ops.push_back("/"); break;
                    case 4: ops.push_back("^"); break;
                }
            }
            reverse(ops.begin(), ops.end());

            string expr;
            for (size_t i = 0; i < groups.size(); i++) {
                expr += groups[i];
                if (i < ops.size()) expr += ops[i];
            }

            vector<string> baseTokens;
            string current_num;
            for (char c : expr) {
                if (isdigit(c)) {
                    current_num += c;
                } else {
                    if (!current_num.empty()) {
                        baseTokens.push_back(current_num);
                        current_num.clear();
                    }
                    baseTokens.push_back(string(1, c));
                }
            }
            if (!current_num.empty()) baseTokens.push_back(current_num);

            auto variants = generateParentheticalVariants(baseTokens);
            variants.push_back(baseTokens);

            for (const auto& tokens : variants) {
                try {
                    auto postfix = shuntingYard(tokens);
                    double result = evaluatePostfix(postfix);
                    if (abs(result - 100) < 1e-6) {
                        string solution;
                        for (const auto& t : tokens) solution += t;
                        return "Solution: " + solution + " = 100";
                    }
                } catch (...) {}
            }
        }
    }
    return "No solution found";
}

int main() {
    cout << findSolution("123456") << endl;
    cout << findSolution("987654") << endl;
    return 0;
}