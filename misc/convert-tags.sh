#!/bin/bash

#
# Convert the following: tags, emdashes.
# 
# {{{br}}} -> \\
# {i{i{...}i}i} -> \bibemph{...}
# {b{b{...}b}b} -> \bibtextbf{...}
# {u{u{...}u}u} -> \bibtextul{...}
# {r{r{...}r}r} -> \textcolor{ubdarkred}{...}
# "...Number" -> "\bibdf Number" (more than one dot means it is a leader, "dot filler")
# "...Letter" -> "\ldots Letter"
# "-" -> "\hyp{}"
# " —" -> "~---"
# "[0-9a-zA-Z]. Text" -> "[0-9a-zA-Z].~Text" (unbreakable space)
# "" -> "" (Get rid of MS-DOS ^M character at the end of lines)
# "<FEFF>" -> "" (Get rid of Unicode marker at the beginning of file).
#

INPUT_DIR=$(pwd)/u8
OUTPUT_DIR=$(pwd)/u8-notags

rm -rf ${OUTPUT_DIR} ; mkdir -p ${OUTPUT_DIR}

cd ${INPUT_DIR}
list=$(find -name '*.txt')
cd ${OUTPUT_DIR}
for path in $list
do
   dir=$(dirname $path)
   file=$(basename $path)
   mkdir -p $dir
   sed -e "s%{{{br}}}%\\\\\\\%g" \
       -e "s%{i{i{%\\\bibemph{%g" \
       -e "s%}i}i}%}%g" \
       -e "s%-%\\\hyp{}%g" \
       -e "s%\.\.\.* *\([0-9][0-9]*\)%\\\bibdf\1%g" \
       -e "s%\.\.\.*\([a-zA-Z]*\)%\\\ldots \1%g" \
       -e "s%—%---%g" ${INPUT_DIR}/${path} | \
       sed -E -e "s/([0-9]{1,3}) ([0-9])/\1\\\,\2/g" > $dir/$file
done
