#!/bin/bash

OUT=tex/paper-titles.tex

echo -E "\thispagestyle{empty}" > $OUT
echo -E "\bibmark{book}{\bibcontname}" >> $OUT
echo -E "\makeatletter" >> $OUT
echo -E "\bib@raise@anchor{\bibpdfbookmark[0]{\bibcontname}{Pprs}}%" >> $OUT
echo -E "\begin{center}\titlefont\bibtocsuperheadfont\bibcontname\end{center}" >> $OUT
echo -E >> $OUT
echo -E "\begin{center}" >> $OUT
echo -E "\bibtocfont" >> $OUT
echo -E "\upartheader{1}" >> $OUT
echo -E "\upapertitleheader{Escrito}{Autor}{Pág.}" >> $OUT

for ((i = 0; i <= 196; i++));
do
    I=$(printf "%03d" $i)
    title=$(sed -ne "1s/.upaper{[0-9][0-9]*}{\(.*\)}/\1/p" tex/p${I}.tex)
    author=$(sed -ne "s/p${I}:\(.*\)$/\1/p" paper-authors.txt)
    if ((i == 29 || i == 57 || i == 87 || i == 119 || i == 148 || i == 180)); then
        echo -E "\tunemarkup{pgnexus10}{\upapertitleheader{Escrito}{Autor}{Pág.}}" >> $OUT
    fi
    if ((i == 31 || i == 56)); then
        echo -E "\upapertitle{$i}{$title}{\parbox[t]{0.3\linewidth}{$author}}{p$i}" >> $OUT
    else
        echo -E "\upapertitle{$i}{$title}{$author}{p$i}" >> $OUT
    fi
    if ((i == 31)); then
        echo -E "\upartheader{2}" >> $OUT
    elif ((i == 56)); then
        echo -E "\upartheader{3}" >> $OUT
    elif ((i == 119)); then
        echo -E "\upartheader{4}" >> $OUT
    fi
done

echo -E "\end{center}" >> $OUT
