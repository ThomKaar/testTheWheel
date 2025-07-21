import pandas as pd
import sys
import matplotlib.pyplot as plt

if len(sys.argv) < 2:
    print("Usage: python aggregate.py <input_file>")
    sys.exit(1)

filename = sys.argv[1]

# Read
df = pd.read_csv(filename)
counts = df['name'].value_counts()
print(counts)

filename = filename.replace('.csv', '')  # Remove .csv for output file name
counts.to_csv(filename + '_counts.csv', index=False)


## Plotting by name
counts.plot(kind='bar')
plt.title('Spins By Name')
plt.xlabel('Name')
plt.ylabel('Number of Spins')
plt.show()


## Plotting distribution of counts
distributionOfCounts = counts.value_counts().sort_index()
distributionOfCounts.plot(kind='bar')
plt.title('Distribution of Spins')
plt.xlabel('Times Spun')
plt.ylabel("# of Individuals")
plt.show()
