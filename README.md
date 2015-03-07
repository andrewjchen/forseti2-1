forseti2
========

forseti2 (named after the Norse god of justice) is the field control software for the Pioneers in Engineering 2014 Robotics Competition. 

## Installation on Ubuntu Linux ##

forseti2 is depdendent on several external libraries. Follow these instructions on Debian/Ubuntu Linux to install these dependencies. On other platforms, you will need to determine how to install these dependencies. 

#### LCM

Refer to the LCM install instructions at [https://lcm-proj.github.io/build_instructions.html](https://lcm-proj.github.io/build_instructions.html).  You may have to also install autoreconf:

	$ sudo apt-get install autoreconf

Once LCM is built, move `lcm-X.Y.Z/lcm-java/lcm.jar` into this directory to take advantage of `lcm-spy.sh` packet introspection.

##### Other dependencies

	$ sudo apt-get install python-pygame
	$ sudo apt-get install arduino
	$ sudo pip install pyfirmata
	$ sudo pip install flask
	$ sudo apt-get install tmux
	$ sudo apt-get install ruby
	$ sudo gem install teamocil


## Installation on Mac OS X ##

On OS X, we use MacPorts to obtain the requisite libaries for at least part of the stack. 

forseti2 is depdendent on several external libraries. Follow these instructions on OS X to install these dependencies. 

### python ###

OS X comes with its own distribution of python. However, you should install the MacPorts distribution to be able to easily install external libraries on top of python. 

    $ sudo port install python27
    $ sudo port install py27-pip
    $ sudo port select --set python python27

### Flask ###

    $ sudo pip install flask

### LCM ####

Refer to the LCM install instructions at [lcm.googlecode.com wiki](https://code.google.com/p/lcm/wiki/BuildInstructions). 

Once LCM is built, move `lcm-1.0.0/lcm-java/lcm.jar` into this directory to take advantage of `lcm-spy.sh` packet introspection.

### pygame ###
    $ sudo port install py27-game
    
### arduino and firmata ###

There's no port avaialble for arduino or firmata. 

# Quickstart
Generate `lcm` types:

	$ ./gen-types.sh



# Common problems

#### lcm library error when running a script:

```
Traceback (most recent call last):
  File "judge_flask.py", line 3, in <module>
    import lcm
  File "/usr/local/lib/python2.7/dist-packages/lcm/__init__.py", line 3, in <module>
    from ._lcm import LCM, LCMSubscription
ImportError: liblcm.so.1: cannot open shared object file: No such file or directory
```
Try:

	$ sudo ldconfig 

#### lcm types import error:
```
Traceback (most recent call last):
  File "judge_flask.py", line 4, in <module>
    import forseti2 as fs2
ImportError: No module named forseti2
```
	$ ./gen-types.sh

