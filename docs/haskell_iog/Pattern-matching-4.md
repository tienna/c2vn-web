---
jupyter:
  celltoolbar: Slideshow
  kernelspec:
    display_name: Haskell
    language: haskell
    name: haskell
  language_info:
    codemirror_mode: ihaskell
    file_extension: .hs
    mimetype: text/x-haskell
    name: haskell
    pygments_lexer: Haskell
    version: 8.10.7
  nbformat: 4
  nbformat_minor: 4
  rise:
    enable_chalkboard: true
    header: "\\<img style=\\\"position: relative; left: 1230px; width:
      200px; top: 10px;\\\"
      src=\\\"https://raw.githubusercontent.com/rober-m/haskell-bootcamp/main/images/input-output.svg\\\"/\\>"
  vscode:
    interpreter:
      hash: e7370f93d1d0cde622a1f8e1c04877d8463912d04d973331ad4851f04de6915a
---


# Pattern matching and Case expressions-4



## Outline

-   Pattern matching in functions
    -   Catch-all patterns
-   Closer look at lists
-   Pattern matching
    -   Lists
    -   Tuples
-   Case expressions
-   Declaration style VS Expression style



## Pattern matching


 
**Pattern matching** is the act of matching data (values, types, etc.)
against a pattern, optionally binding variables to successful matches.



We are going to discuss pattern matching in three cases:



-   Pattern matching in function definitions.

-   Pattern matching for lists.

-   Pattern matching for tuples.



It sounds complicated, but it\'s actually pretty intuitive when you get
the hang of it. It\'ll be clear as day after a few examples.



Let\'s pattern match some functions!



## Pattern matching in functions



Remember `specialBirthday` function from last lesson?



``` {.haskell}
specialBirthday :: Int -> [Char]
specialbirthday age =
  if age == 1
    then "First birthday!"
    else
      if age == 18
        then "You're an adult!"
        else
          if age == 60
            then "Finally, I can stop caring about new lingo!"
            else "Nothing special"
```



I know, I know\... we fixed that atrocity with guards. But now, we\'ll
get fancier and solve it with pattern matching!



To pattern match on function definitions, we just have to define the
same function multiple times, replacing the parameters with values. Like
this:



``` {.haskell}
specialBirthday :: Int -> [Char]
specialBirthday 1   = "First birthday!"
specialBirthday 18  = "You're an adult!"
specialBirthday 60  = "finally, I can stop caring about new lingo!"
```



Our function has been defined! And it looks way nicer than before!

And how does it work? Well, when presented with code like this, Haskell
will attempt to match the value of `age` with the first definition. If
`age /= 1`, it will try to match the second definition. If `age /= 18`,
it will try to match the third definition. And so on until the value
passed as a parameter matches one of the definition\'s values.



And, of course, I\'m sure you noticed a huge problem. What happens if we
pass a number different from the ones defined? Like 29? We can solve
that with catch-all patterns!



### Catch-all patterns



The function\'s signature clearly states that you can pass any value of
type `Int`.

So, we could pass `14`---per example---or any other number, for that
matter. But what should the function do if we pass `14`? We didn\'t
specify it because we didn\'t pattern match for `14`! So, the program
will crash 💥 because it doesn\'t know how to handle that value! 😱

Because we need the function to work with any value that our types can
accept, we need to pattern match for all possible situations. But you
can\'t write a definition for every single value! Then, what can you
do?!?!

You use a catch-all pattern!


 
**Catch-all patterns allow you to provide a default definition in case
none of your specific ones match**



In this case, it\'ll play the role of the `else` at the end of
`specialBirthday`.


 
To use catch-all patterns, you have to provide a name that starts with
lowercase, like `age`, `x`, or
`yearsSinceThisPoorSoulHasTouchedTheEarth`.



Like this:



``` {.haskell}
specialBirthday :: Int -> [Char]
specialBirthday 1   = "First birthday!"
specialBirthday 18  = "You're an adult!"
specialBirthday 60  = "finally, I can stop caring about new lingo!"
specialBirthday age = "Nothing special"

specialBirthday 18
```

Kết quả:
    "You're an adult!"




Now, if we pass any number different from `1`, `18`, or `60`,
`specialBirthday` will evaluate to `"Nothing special"`.


 
```

IMPORTANT:Always provide Pattern matches for all possible scenarios!
If you don't, you'll get the next warning:
    
`Pattern match(es) are non-exhaustive In an equation for specialBirthday`


```



Another important detail is that Haskell matches from top to bottom. So,
if you do something like:



``` {.haskell}
specialBirthday :: Int -> [Char]
specialBirthday age = "Nothing special"
specialBirthday 1   = "First birthday!"
specialBirthday 18  = "You're an adult!"
specialBirthday 60  = "finally, I can stop caring about new lingo!"

specialBirthday 60
```

Kết quả:
    "Nothing special"




The first definition will catch all the occurrences, and we\'ll always
get `"Nothing special"` as a result, no matter the number we pass. So,
make sure to add the catch-all pattern as the last definition.



Finally, we said that you can optionally **bind variables to successful
matches**, and that\'s what we just did!

When using `specialBirthday`, every time the value falls into the `age`
catch-all pattern, we bind that value to the `age` variable. Allowing us
to use the value inside the definition\'s expression (it\'s just an
argument)!:



``` {.haskell}
-- Note: You should know how to use `show` if you did last week homework.

specialBirthday :: Int -> [Char]
specialBirthday 1   = "First birthday!"
specialBirthday 18  = "You're an adult!"
specialBirthday 60  = "finally, I can stop caring about new lingo!"
specialBirthday age = "Nothing special, you're just " ++ show age

specialBirthday 22
```

Kết quả:
    "Nothing special, you're just 22"




You cannot overstate how useful this is! **You\'re filtering values to
the ones that match a specific pattern AND binding those values to
variables for later use at the same time!**

A more compelling example of how this is useful is when pattern matching
more complex structures like lists and tuples. Let\'s explore that.



## A closer look at lists



Before learning about pattern matching with lists, we need to take a
closer look at lists.



We know that the `:` (cons) operator adds an element to the beginning of
a list (prepends an element):


 {.cell .code execution_count="64" slideshow="{\"slide_type\":\"fragment\"}"}
``` {.haskell}
-- (:) :: a -> [a] -> [a]

3 : [4,5]  -- [3,4,5]

'L' : "ook, mom! I'm programming"  -- "I'm programming"
```

Kết quả:
    [3,4,5]


Kết quả:
    "Look, mom! I'm programming"




Remember when I told you that `String` was syntactic sugar for `[Char]`?
Well, get ready for a sugar rush because **the way we wrote lists so far
is actually syntactic sugar for the real way Haskell sees lists! As an
empty list prepended with all the elements that it contains!** 🤯


 {.cell .code execution_count="65" slideshow="{\"slide_type\":\"fragment\"}"}
``` {.haskell}
[1,2,3,4] == 1:2:3:4:[]  -- True

"Hello!"  == 'H':'e':'l':'l':'o':'!':[]  -- True
```

Kết quả:
```

class="suggestion-warning">Found:<div class="highlight-code" id="haskell">1 : 2 : 3 : 4 : []<div class="suggestion-row" style="float: left;"><div class="suggestion-warning">Why Not:<div class="highlight-code" id="haskell">[1, 2, 3, 4]<div class="suggestion-name" style="clear:both;">Use list literal<div class="suggestion-row" style="float: left;"><div class="suggestion-warning">Found:<div class="highlight-code" id="haskell">'H' : 'e' : 'l' : 'l' : 'o' : '!' : []<div class="suggestion-row" style="float: left;"><div class="suggestion-warning">Why Not:<div class="highlight-code" id="haskell">['H', 'e', 'l', 'l', 'o', '!']
```


Kết quả:
    True


Kết quả:
    True




Now, you could be thinking: \"Why do I care? I\'ll keep writing lists as
always.\" To what I say: \"AHA! PATTERN MATCHING!!\"



## Pattern matching lists



Now that we know what lists look like without makeup 💅, we can use it to
pattern match different function definitions depending on the list\'s
structure!

Let\'s pattern match in a bunch of different ways and investigate how
the code works later:



``` {.haskell}
whatsInsideThisList :: [Int] -> String
whatsInsideThisList []         = "It's empty!"
whatsInsideThisList [x]        = "A single element: " ++ show x
whatsInsideThisList [x, y]     = "Two elements: " ++ show x ++ " and " ++ show y
whatsInsideThisList (x:y:z:[]) = "The list has three elements: " ++ show [x,y,z]
whatsInsideThisList (x:rest)   = "The first element is: " ++ show x ++ ", and there are quite a few more!"

whatsInsideThisList []           -- "It's empty!"
whatsInsideThisList [1, 2]       -- "Two elements: 1 and 2"
whatsInsideThisList [1, 2, 3]    -- "The list has three elements: [1,2,3]"
whatsInsideThisList [1, 2, 3, 4] -- "The first element is: 1, and there are quite a few more!"
```

Kết quả:
```

</style><div class="suggestion-name" style="clear:both;">Use list literal pattern<div class="suggestion-row" style="float: left;"><div class="suggestion-warning">Found:<div class="highlight-code" id="haskell">(x : y : z : [])<div class="suggestion-row" style="float: left;"><div class="suggestion-warning">Why Not:<div class="highlight-code" id="haskell">[x, y, z]
```


Kết quả:
    "It's empty!"


Kết quả:
    "Two elements: 1 and 2"


Kết quả:
    "The list has three elements: [1,2,3]"


Kết quả:
    "The first element is: 1, and there are quite a few more!"




As you can see, you can pattern match for:

-   Empty list `[]`.

-   List of fixed size, both with (`[x]`, `[x,y]`) and without
    (`x:[]`,`x:y:[]`) syntactic sugar.

-   Non-empty lists of any size with `x:rest`. (Commonly used in
    recursive functions and usually named `x:xs`.)



```
<div class="alert alert-block alert-info">
We surround with `()` the patterns of the last two definitions to indicate that the function takes everything inside the `()` as a single argument.

```



And, because we bound the matches to variables (`x`, `y`,`z`, `rest`),
you can use those variables inside the function\'s definition.

But what if you don\'t need them? What if you want to do something when
a specific pattern matches, but don\'t care for the actual value/values?

**Binding values and then ignoring them pollutes your environment with
variables you\'ll never use!** But don\'t worry. To put the cherry on
top, you can ignore the data you don\'t care for while pattern matching
for the rest! Take a look at the following function. It tells us which
are the first and third elements in a list of `Bool` (if any):



``` {.haskell}
firstAndThird :: [Bool] -> String
firstAndThird (x:_:z:_) = "The first and third elements are: " ++ show x ++ " and " ++ show z
firstAndThird _ = "Don't have them!"

firstAndThird [True, True, False]
```

Kết quả:
    "The first and third elements are: True and False"




The first definition will pattern match for any list with 3 or more
elements, while `_` will ignore the second element and the rest of the
list.

And for any other list, we just entirely ignore it with `_` for the
whole list.



Awesome, right? Knowing this, we can modify the `initials` function of
the last lesson from this:


 {.cell .code execution_count="71" slideshow="{\"slide_type\":\"slide\"}"}
``` {.haskell}
initials :: String -> String -> String
initials name lastName = if name == "" || lastName == ""
                         then "How was your name again?"
                         else let x = head name
                                  y = head lastName
                              in [x] ++ "." ++ [y] ++ "."

initials' "Nikola" "Tesla"
```

Kết quả:
    "N.T."




To this:



``` {.haskell}
initials' :: String -> String -> String  
initials' (f:_) (l:_) = [f] ++ "." ++ [l] ++ "." 
initials' _ _ = "How was your name again?"

initials' "Nikola" "Tesla"
```

Kết quả:
    "N.T."




Shorter and clearer.



Now let\'s see how pattern matching makes our lives easier with tuples!



## Pattern matching tuples



As you can recall from previous lessons, we could only get the elements
inside a pair (tuple of two elements) using the `fst` and `snd`
functions.

If you needed a value from tuples bigger than that, you were in a
pickle. 👀 But now that you\'re a pattern-matching magician 🪄, the sky is
the limit!

Want to extract the first element of a 3-element tuple? No problem:



``` {.haskell}
firstOfThree :: (a, b, c) -> a
firstOfThree (x, _, _) = x

firstOfThree (1,2,3)
```

Kết quả:
    1




**Done!**

Want to create a pair with the second and fourth elements of a 4-element
tuple? Same as before!:



``` {.haskell}
pairFromFour :: (a, b, c, d) -> (b, d)
pairFromFour (_, x, _, y) = (x, y)

pairFromFour (1,2,3,4)
```

Kết quả:
    (2,4)




**BOOM! 💥 Done!** And you can keep going if you want. But, right now,
we\'re going to move to `case` expressions.



## Case expressions



With `case` expressions, we can execute a specific block of code based
on a variable\'s pattern.



Same as with `switch` statements in other programming languages. `case`
expressions look like this:


 
``` {.haskell}
case <Exp> of <Pattern1> -> <Result1>
              <Pattern2> -> <Result2>
              <Pattern3> -> <Result3>
	          ...
```



Where the value of `<Exp>` is compared to every `<Pattern>` inside the
`of` block. And if it matches, the corresponding `<Result>` is
evaluated.

(Notice that there\'s no `=` sign! That\'s because the entire `case`
expression is just an expression. Not a function or a binding.)



As an example, we can write a function that takes a 3-`Int` tuple and
checks if any of the elements it contains is a zero:


 {.cell .code execution_count="72" slideshow="{\"slide_type\":\"slide\"}"}
``` {.haskell}
checkForZeroes :: (Int, Int, Int) -> String
checkForZeroes tuple3 = case tuple3 of
  (0, _, _) -> "The first one is a zero!"
  (_, 0, _) -> "The second one is a zero!"
  (_, _, 0) -> "The third one is a zero!"
  _         -> "We're good!"
  
checkForZeroes (32,0,256)
```

Kết quả:
    "The second one is a zero!"




And I already can hear you saying. \"Isn\'t the end result the same that
we got when pattern matching on parameters in function definitions?\"

Well\... yes. At its core, pattern matching on parameters in function
definitions is just syntactic sugar for case expressions! So, the
previous code is interchangeable with this one:



``` {.haskell}
checkForZeroes :: (Int, Int, Int) -> String
checkForZeroes (0, _, _) = "The first one is a zero!"
checkForZeroes (_, 0, _) = "The second one is a zero!"
checkForZeroes (_, _, 0) = "The third one is a zero!"
checkForZeroes _         = "We're good!"

checkForZeroes (32,0,256)
```

Kết quả:
    "The second one is a zero!"




But! Because now we\'re using case EXPRESSIONS, we can use them anywhere
an expression can be used! Not only when defining a function. So, for
example, we can concatenate the result of evaluating the case expression
with another String:



``` {.haskell}
checkForZeroes' :: (Int, Int, Int) -> String
checkForZeroes' tuple3 = "The " ++ show tuple3 ++ " has " ++
    case tuple3 of
      (0, _, _) -> "a zero as its first element"
      (_, 0, _) -> "a zero as its second element"
      (_, _, 0) -> "a zero as its third element"
      _         -> "no zeroes!"

checkForZeroes' (32,0,256)
```

Kết quả:
    "The (32,0,256) has a zero as its second element"




That makes `case` expressions convenient to use inside other
expressions. But also, keep in mind that anything that you can do with
`case` expressions can be done by defining functions with `let`,
`where`, or guards.

And that begs the question: \"Why do we have so many ways of doing the
same thing?!\" I\'ll tell you why\...



## Declaration style 🆚 Expression style {#declaration-style--expression-style}



There are two main styles for writing functional programs in Haskell:


 
-   The **declaration style** is where you formulate an algorithm in
    terms of several equations to be satisfied.
-   The **expression style** is where you compose big expressions from
    small expressions.



Many moons ago, the `<s>`creators of`</s>` Haskell gods
engaged in furious debate as to which style was better. Mainly because
if there was possible, having just one way of doing something provided
less confusion and redundancy. But! After blood, sweat, and tears were
shed, they decided to provide full syntactic support to both. And let
the mere mortals use what they like best.

As examples of this, we got:


 
  ------------------------------------------------------------------------
  Declaration style                    Expression style
  ------------------------------------ -----------------------------------
  `where` clause                       `let` expressions

  Pattern matching in function         case expression:
  definitions: `f [] = 0`              `f xs = case xs of [] -> 0`

  Guards on function definitions:      `if` expression:
  `f [x] \| x > 0 = 'a'`               `f [x] if x > 0 then 'a' else...`

  Function arguments on left-hand      Lambda abstraction: `f = \x -> x*x`
  side: `f x = x*x`                    
  ------------------------------------------------------------------------



And what\'s that lambda thing at the end of the table? That\'s a subject
for next week\'s lesson! 😁 So make sure to watch it!

Now, as a summary:



## Summary

-   Pattern matching for function definitions makes it straightforward
    to do different things depending on the structure or value of the
    arguments.

-   Pattern matching on tuples, lists, and other structures, allows you
    to easily extract the values contained.

-   Case expressions are a more expressive way of pattern-matching
    function definitions, but they can also be used almost everywhere as
    any other expression. (Not only to define functions.)

-   The two main styles for writing functional programming in Haskell
    are the \"Declaration style\" and \"Expression style.\" Don\'t waste
    time arguing about which one is the best. Adopt the one you like
    more, or mix and match as you want.

