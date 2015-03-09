all: RCSwitchDio

send-dio: RCSwitchDio.o RCSwitchDio.h
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $+ -o $@ -lwiringPi
	
clean:
	$(RM) *.o RCSwitchDio