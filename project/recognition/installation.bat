@echo off
REM Batch command to easily invoke the pip install/ uninstall function.
REM User can quickly install the required python module by just entering the module name
REM Runs on Windows
 
:start
cls
echo.
echo.
echo Select menu
echo ================
echo 1. Install/Upgrade pip
echo 2. Installing realtime-ticketing dependecies
echo 3. Display python modules being installed using pip function
echo.
 
REM set the python version here
set python_ver=27
 
set /p x=Pick:
IF '%x%' == '1' GOTO NUM_3
IF '%x%' == '2' GOTO NUM_2
IF '%x%' == '3' GOTO NUM_1
GOTO start
 
:NUM_1
cd \
cd \python%python_ver%\Scripts\
pip freeze
pause
exit
 
:NUM_2
echo  Installing realtime-ticketing dependecies for you... 

pip install --upgrade -r requirements.txt
 
pause
exit
 
:NUM_3
echo  INSTALLing pip
python -m pip install -U pip
 
pause
exit