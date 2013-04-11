# Stupid Trains

I commute to work. I hate commuting.

I am at the mercy of [South West Trains](http://southwesttrains.co.uk)
and the service is so often delayed, I decided it was time to monitor
their lateness.  This started off as a LibreOffice spreadsheet, but I'm
a developer, dammit! We need an over-engineered solution.

If you hate commuting, this is the repo for you.

## Database

The database supplied with this repo contains the data that I have
recorded. It will be updated every time I push from master, but not in
perpetuity (contrary to popular belief, I have better things to do). If
you want to collect your own statistics, you can use the `nuke` tool.

[Write something general about the database]

A full overview of the database schema can be found in the project wiki.

## Update Tool

Usage: `update [OPTION] RECORD`

The record definitions are similar to regular expressions; I'm sure it's
clear enough. Note that data must be entered in the correct format,
otherwise the tool or the database constraints will complain.

### `-log`

Record: `DATE FROM SCHEDULE TO ARRIVE (EXCUSE CANCELLED?)?`

Append a journey log entry:

* `DATE` Journey date (YYYY-MM-DD)
* `FROM` Origin station code
* `SCHEDULE` Scheduled departure time (HH:MM)
* `TO` Destination station code
* `ARRIVE` Actual arrival time (HH:MM)
* `EXCUSE` Guard's excuse for the service, if any
* `CANCELLED` 0 = No (default), or 1 = Yes

If the `ARRIVE` time is after midnight, you must also specify a date
component (YYYY-MM-DD HH:MM).

Note that, as the most common use-case, `-log` can be omitted.

### `-route`

Record: `ORIGIN DEPART (STATION ARRIVE)+`

Create a new route from the `ORIGIN` station code, at the scheduled
`DEPART` time, to each of the following `STATION` codes and advertised
`ARRIVE` time tuples. There must be at least one destination tuple;
arrival times must be greater than the departure time, but destinations
needn't be in order. The route will be attached to the most recent
origin; if one can't be found, you will be prompted to supply its
validity dates and it will be added. Station codes must, however, exist.

e.g., `WAT 08:00 WIM 08:10 KNG 08:30`
The 8am from Waterloo, arriving in Wimbledon at 8:10 and
Kingston-upon-Thames at 8:30.

If the arrival time is after midnight, you must also specify a date
component, the day after the Unix epoch. I'm too lazy to write logic
that works this out automagically.

e.g., `WAT 23:56 CLJ "1970-01-02 00:12"`

### `-station`

Record: `CODE DESCRIPTION`

Add a station to the database. [Official codes](http://dft.gov.uk/naptan)
needn't be used, providing you're consistent and stick to the three
character format.

### `-origin`

Record: `ORIGIN DEPART START FINISH?`

Adjust a route's `ORIGIN` station code and scheduled `DEPART` time's
validity period: from midnight on `START`, to midnight on `FINISH`
(which may be omitted if this information isn't available).


### `-json`

Parameter: `FILENAME`

Import data from a JSON file. See the project wiki for the schema.

## Statistical Analyses

The database stores the scheduled arrival times of trains on a route. It
must be noted that South West Trains don't publish arrival times for
minor stations, so we must use the published departure times. As one
generally departs after arriving, this skews the statistics in South
West Train's favour.

[TODO]

## License

Copyright © 2013 Christopher Harrison

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
*Software*), to deal in the *Software* without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the *Software*, and to
permit persons to whom the *Software* is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the *Software*.

**The *Software* is provided "as is", without warranty of any kind,
express or implied, including but not limited to the warranties of
merchantability, fitness for a particular purpose and noninfringement.
In no event shall the authors or copyright holders be liable for any
claim, damages or other liability, whether in an action of contract,
tort or otherwise, arising from, out of or in connection with the
*Software* or the use or other dealings in the *Software*.**
