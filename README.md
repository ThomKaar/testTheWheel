# testTheWheel
some scripts to test YF Web sync wheel spins


## How to run 
```
git clone https://github.com/ThomKaar/testTheWheel.git;
cd testTheWheel;
npm install;

// output aggreagation of spins to the file:  'someFile.csv'
node testTheWheel.js 10 someFile.csv;

// output aggregation of 100 spins running in batches of 10 to default file: 'output.csv'
node testTheWheel.js 100 10;

// output aggreagation of 1000 spins running in batches of one (default) to the file: 'thousand.csv'
node testTheWheel.js 1000 thousand.csv;

// After the output you can aggregate and plot the data w/
python aggregate.py <filename>;
// using one of the files above -- python aggregate.py thousand.csv
// ^ that will create a new file <filename>_counts.csv and plot the data



## example output
```
name
Kevin
Kevin
Vineet
Kevin
Kevin
Kevin
Kevin
Vineet
Kevin
Kevin
Kevin
Kevin
Vineet
Thomas
```
