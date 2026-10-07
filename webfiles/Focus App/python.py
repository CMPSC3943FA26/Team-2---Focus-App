#using python to try to get two timers
import threading
import time

def start_sequence(t):
    while t:
        mins, secs = divmod(t, 60)
        timer = '{:02d}:{:02d}'.format(mins, secs)
        print(timer, end="\r")
        time.sleep(1)
        t -= 1
    print("Time's up!")

t1 = int(input("Enter the time for timer 1 in seconds: "))
t2 = int(input("Enter the time for timer 2 in seconds: "))

threading.Thread(target=start_sequence, args=(t1,)).start()
threading.Thread(target=start_sequence, args=(t2,)).start()