

Instruction counters are problematic if you wanna boil down to the specific instructions, as 
CPUs might execute different Instructions out of order: https://en.wikipedia.org/wiki/Hardware_performance_counter (IBS)

However for our case of getting the total this should not be too problematic, especially if we repeat measurements and can filter 
out the random effects.
