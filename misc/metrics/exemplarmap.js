/*

File Name: exemplarmap.js

------------------------------------------------

Exemplar Structure Map of The Urantia Book       last edit 2010-01-02 trb

Copyright (C) 2007, 2009 Troy R. Bishop.  All rights reserved.

LICENSE --------------------------
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
---------------------------------------------------------------------------------

This object contains the following public methods:

   expandExemplarDataForPaperWhereNecessary (paperNumber)
   lineNumberInSection (paperNumber, lineNumber)
   lineType (paperNumber, lineNumber)
   numberOfLinesInPaper (paperNumber)
   numberOfLinesInSection (paperNumber, sectionNumber)
   numberOfSectionsInPaper (paperNumber)
   paperNumberAndLineNumberAreValid (paperNumber, lineNumber)
   sectionNumberOfLine (paperNumber, lineNumber)
   lineNumberInPaperOfSectionTitle (paperNumber, sectionNumber);

   lineNumber, sectionNumber, and paperNumber are purely physical and are unmapped.
   lineNumber is one-based and unmapped.
   sectionNumber is zero-based and unmapped.
   paperNumber is zero-based and unmapped.

-------------------------------------------------
*/

//this is the exemplarMap constructor
function exemplarMap ()
   {

//   BEGIN PROPERTIES

   this.vcurrentPaperNumber = null;
   this.vnumberOfSectionsInPaper = null;
   this.vnumberOfLinesInPaper = null;
   this.lineArray = new Array();
   this.sectionArray = new Array();
   this.exemplarSectionSizeArray = 
[
/* Paper0 */   [6, 26, 18, 25, 13, 12, 13, 10, 12, 5, 2, 16, 14],
/* Paper1 */   [6, 6, 10, 8, 7, 16, 8, 9],
/* Paper2 */   [3, 11, 7, 6, 5, 12, 9, 13],
/* Paper3 */   [3, 12, 15, 5, 7, 17, 9],
/* Paper4 */   [3, 12, 8, 7, 9, 8],
/* Paper5 */   [2, 12, 6, 8, 15, 14, 14],
/* Paper6 */   [4, 6, 8, 5, 10, 7, 4, 3, 9],
/* Paper7 */   [5, 11, 4, 7, 7, 11, 8, 7],
/* Paper8 */   [4, 11, 8, 9, 8, 6, 8],
/* Paper9 */   [5, 8, 5, 8, 6, 7, 9, 5, 26],
/* Paper10 */   [3, 6, 8, 19, 7, 8, 18, 6, 10],
/* Paper11 */   [2, 4, 11, 4, 5, 9, 5, 9, 9, 9],
/* Paper12 */   [3, 16, 6, 12, 16, 11, 13, 14, 16, 7],
/* Paper13 */   [7, 23, 10, 3, 8],
/* Paper14 */   [2, 18, 9, 8, 22, 11, 42],
/* Paper15 */   [3, 6, 25, 16, 9, 14, 16, 12, 10, 18, 23, 3, 4, 6, 10],
/* Paper16 */   [12, 4, 5, 20, 16, 5, 11, 10, 19, 16],
/* Paper17 */   [12, 10, 6, 11, 3, 5, 10, 1, 10],
/* Paper18 */   [11, 6, 4, 9, 9, 5, 7, 6],
/* Paper19 */   [9, 12, 6, 7, 9, 12, 8, 6],
/* Paper20 */   [5, 15, 9, 4, 5, 7, 9, 5, 4, 5, 5],
/* Paper21 */   [5, 4, 12, 24, 6, 10, 5],
/* Paper22 */   [5, 15, 9, 4, 7, 6, 3, 14, 6, 8, 10],
/* Paper23 */   [2, 10, 24, 9, 7],
/* Paper24 */   [11, 16, 9, 4, 3, 5, 9, 10],
/* Paper25 */   [9, 7, 12, 17, 20, 4, 6, 4, 12],
/* Paper26 */   [1, 17, 7, 10, 15, 6, 4, 6, 5, 4, 7, 9],
/* Paper27 */   [11, 5, 3, 4, 4, 5, 6, 11],
/* Paper28 */   [6, 3, 2, 2, 14, 22, 22, 5],
/* Paper29 */   [11, 4, 19, 12, 38, 8],
/* Paper30 */   [2, 114, 157, 13, 35],
/* Paper31 */   [13, 5, 4, 8, 1, 3, 2, 5, 4, 14, 22],
/* Paper32 */   [4, 5, 13, 15, 12, 9],
/* Paper33 */   [1, 5, 5, 8, 8, 4, 9, 8, 7],
/* Paper34 */   [3, 4, 6, 8, 13, 7, 13, 9],
/* Paper35 */   [7, 4, 9, 22, 5, 7, 5, 3, 15, 10, 6],
/* Paper36 */   [1, 4, 20, 9, 8, 17, 8],
/* Paper37 */   [2, 10, 11, 8, 5, 11, 7, 2, 10, 12, 7],
/* Paper38 */   [3, 3, 6, 1, 4, 4, 3, 7, 6, 14],
/* Paper39 */   [11, 18, 18, 11, 18, 17, 9, 2, 10, 4],
/* Paper40 */   [11, 2, 2, 1, 2, 19, 8, 5, 5, 9, 15],
/* Paper41 */   [4, 5, 8, 10, 7, 8, 7, 15, 4, 5, 6],
/* Paper42 */   [2, 9, 23, 13, 14, 16, 8, 10, 7, 5, 7, 8, 16],
/* Paper43 */   [4, 11, 8, 8, 10, 17, 8, 5, 13, 6],
/* Paper44 */   [21, 15, 11, 9, 12, 10, 9, 4, 7],
/* Paper45 */   [3, 11, 6, 22, 21, 7, 9, 9],
/* Paper46 */   [1, 9, 9, 4, 9, 33, 12, 8, 5],
/* Paper47 */   [4, 6, 8, 12, 8, 3, 4, 5, 7, 5, 8],
/* Paper48 */   [3, 7, 26, 18, 20, 10, 37, 31, 5],
/* Paper49 */   [5, 7, 26, 6, 9, 32, 22],
/* Paper50 */   [2, 4, 7, 6, 13, 11, 5, 4],
/* Paper51 */   [3, 8, 4, 9, 8, 7, 13, 6],
/* Paper52 */   [9, 8, 12, 12, 10, 10, 8, 17],
/* Paper53 */   [2, 6, 5, 7, 7, 7, 6, 15, 9, 9],
/* Paper54 */   [2, 10, 5, 3, 8, 14, 11],
/* Paper55 */   [12, 6, 12, 22, 31, 6, 10, 4, 7, 3, 11, 8, 6],
/* Paper56 */   [2, 6, 3, 6, 5, 4, 5, 9, 4, 14, 23],
/* Paper57 */   [2, 7, 4, 12, 9, 14, 11, 10, 27],
/* Paper58 */   [1, 8, 10, 5, 4, 8, 8, 13],
/* Paper59 */   [9, 20, 13, 12, 18, 23, 13],
/* Paper60 */   [2, 14, 15, 22, 7],
/* Paper61 */   [3, 14, 13, 15, 7, 8, 4, 20],
/* Paper62 */   [1, 3, 6, 13, 7, 11, 6, 8],
/* Paper63 */   [3, 4, 7, 6, 9, 7, 9, 5],
/* Paper64 */   [2, 8, 7, 5, 13, 4, 35, 21],
/* Paper65 */   [7, 9, 16, 7, 12, 4, 10, 8, 7],
/* Paper66 */   [2, 5, 9, 8, 16, 31, 7, 20, 8],
/* Paper67 */   [1, 6, 6, 10, 7, 5, 10, 8, 6],
/* Paper68 */   [3, 7, 11, 5, 7, 13, 12],
/* Paper69 */   [3, 6, 7, 11, 8, 15, 8, 5, 12, 19],
/* Paper70 */   [3, 22, 21, 11, 10, 9, 6, 19, 18, 17, 16, 14, 21],
/* Paper71 */   [2, 24, 19, 12, 17, 4, 3, 13, 16],
/* Paper72 */   [3, 5, 17, 9, 6, 12, 9, 14, 7, 8, 3, 5, 6],
/* Paper73 */   [3, 7, 5, 6, 5, 8, 8, 5],
/* Paper74 */   [1, 6, 8, 10, 6, 8, 9, 24, 15],
/* Paper75 */   [1, 6, 5, 9, 8, 9, 4, 7, 8],
/* Paper76 */   [2, 4, 9, 10, 8, 7, 5],
/* Paper77 */   [2, 7, 12, 9, 13, 10, 6, 8, 13, 13],
/* Paper78 */   [2, 13, 5, 10, 6, 8, 8, 7, 13],
/* Paper79 */   [1, 9, 8, 8, 9, 9, 13, 6, 18],
/* Paper80 */   [2, 8, 5, 9, 6, 8, 5, 13, 5, 17],
/* Paper81 */   [2, 8, 20, 8, 14, 7, 45],
/* Paper82 */   [3, 10, 5, 15, 5, 10, 12],
/* Paper83 */   [3, 5, 6, 4, 9, 15, 8, 9, 10],
/* Paper84 */   [3, 9, 7, 10, 11, 14, 8, 30, 7],
/* Paper85 */   [4, 5, 6, 5, 4, 3, 5, 4],
/* Paper86 */   [2, 6, 7, 4, 8, 17, 7, 7],
/* Paper87 */   [2, 5, 10, 5, 7, 14, 17, 11],
/* Paper88 */   [2, 10, 10, 4, 8, 5, 9],
/* Paper89 */   [2, 7, 5, 7, 10, 16, 8, 5, 8, 4, 7],
/* Paper90 */   [3, 6, 13, 10, 9, 9],
/* Paper91 */   [5, 6, 8, 7, 5, 7, 7, 13, 13, 9],
/* Paper92 */   [5, 5, 6, 10, 9, 16, 20, 16],
/* Paper93 */   [2, 3, 8, 8, 16, 14, 8, 4, 1, 11, 12],
/* Paper94 */   [1, 7, 8, 8, 10, 8, 12, 8, 19, 6, 3, 13, 8],
/* Paper95 */   [1, 11, 10, 5, 5, 15, 9, 7],
/* Paper96 */   [3, 15, 5, 5, 9, 9, 4, 9],
/* Paper97 */   [2, 10, 3, 6, 7, 6, 4, 14, 7, 29, 9],
/* Paper98 */   [4, 6, 12, 9, 8, 5, 5, 13],
/* Paper99 */   [3, 6, 6, 16, 13, 11, 4, 6],
/* Paper100 */   [2, 9, 8, 7, 6, 11, 9, 19],
/* Paper101 */   [3, 7, 17, 18, 10, 14, 17, 6, 4, 9, 10],
/* Paper102 */   [3, 6, 9, 15, 6, 3, 10, 10, 8],
/* Paper103 */   [7, 6, 10, 5, 5, 12, 15, 15, 6, 13],
/* Paper104 */   [3, 13, 6, 18, 47, 13],
/* Paper105 */   [3, 8, 11, 10, 9, 10, 5, 19],
/* Paper106 */   [19, 4, 8, 5, 4, 4, 6, 10, 23, 13],
/* Paper107 */   [7, 7, 9, 10, 7, 6, 7, 8],
/* Paper108 */   [2, 9, 11, 10, 5, 10, 9],
/* Paper109 */   [1, 5, 11, 8, 6, 5, 7, 9],
/* Paper110 */   [2, 6, 6, 10, 6, 7, 22, 11],
/* Paper111 */   [7, 9, 10, 7, 12, 6, 10, 6],
/* Paper112 */   [16, 19, 20, 7, 13, 22, 10, 20],
/* Paper113 */   [2, 8, 10, 6, 6, 5, 10, 9],
/* Paper114 */   [11, 4, 6, 5, 5, 6, 20, 18],
/* Paper115 */   [1, 4, 4, 19, 7, 2, 8, 9],
/* Paper116 */   [5, 5, 14, 6, 12, 17, 8, 7],
/* Paper117 */   [4, 9, 9, 13, 14, 14, 27, 18],
/* Paper118 */   [13, 10, 5, 7, 7, 3, 8, 8, 11, 9, 24],
/* Paper119 */   [7, 6, 7, 8, 6, 5, 6, 8, 9],
/* Paper120 */   [9, 7, 9, 12, 6],
/* Paper121 */   [1, 9, 12, 10, 6, 18, 9, 12, 14],
/* Paper122 */   [3, 3, 8, 4, 4, 11, 3, 8, 7, 28, 4],
/* Paper123 */   [6, 7, 16, 10, 9, 15, 9],
/* Paper124 */   [1, 13, 10, 10, 9, 6, 18],
/* Paper125 */   [7, 5, 12, 2, 4, 10, 13],
/* Paper126 */   [4, 7, 8, 14, 9, 12],
/* Paper127 */   [4, 8, 12, 15, 10, 6, 16],
/* Paper128 */   [5, 15, 7, 9, 9, 9, 12, 14],
/* Paper129 */   [3, 15, 11, 9, 8],
/* Paper130 */   [7, 6, 10, 10, 15, 4, 6, 8, 6],
/* Paper131 */   [2, 9, 13, 7, 8, 5, 2, 3, 6, 4, 8],
/* Paper132 */   [10, 4, 10, 11, 8, 25, 3, 9],
/* Paper133 */   [3, 5, 5, 12, 14, 12, 7, 13, 4, 6],
/* Paper134 */   [2, 7, 5, 8, 10, 17, 16, 7, 10, 9],
/* Paper135 */   [5, 4, 4, 4, 6, 8, 8, 3, 7, 9, 3, 4, 7],
/* Paper136 */   [2, 6, 8, 7, 14, 6, 11, 4, 8, 13, 1],
/* Paper137 */   [1, 8, 9, 7, 17, 4, 6, 14, 18],
/* Paper138 */   [2, 5, 10, 8, 4, 4, 5, 7, 11, 3, 11],
/* Paper139 */   [4, 12, 15, 9, 15, 12, 9, 10, 13, 11, 11, 14],
/* Paper140 */   [3, 7, 3, 21, 11, 24, 14, 8, 32, 4, 10],
/* Paper141 */   [2, 5, 3, 8, 9, 4, 5, 15, 3, 3],
/* Paper142 */   [2, 7, 5, 23, 4, 5, 9, 17, 5],
/* Paper143 */   [2, 9, 8, 8, 3, 13, 6, 9],
/* Paper144 */   [3, 10, 6, 23, 11, 102, 13, 4, 8, 2],
/* Paper145 */   [3, 3, 17, 15, 3, 10],
/* Paper146 */   [2, 4, 18, 11, 6, 3, 4, 3],
/* Paper147 */   [2, 4, 4, 6, 10, 10, 6, 3, 6],
/* Paper148 */   [5, 4, 5, 5, 11, 5, 12, 4, 5, 4],
/* Paper149 */   [4, 9, 14, 3, 6, 5, 12, 3],
/* Paper150 */   [4, 3, 3, 12, 4, 5, 3, 4, 11, 5],
/* Paper151 */   [2, 5, 8, 16, 7, 7, 8],
/* Paper152 */   [3, 5, 10, 3, 4, 6, 6, 3],
/* Paper153 */   [3, 7, 13, 7, 6, 5],
/* Paper154 */   [3, 3, 5, 2, 6, 4, 12, 5],
/* Paper155 */   [1, 6, 3, 8, 2, 16, 19],
/* Paper156 */   [2, 8, 8, 2, 3, 23, 10],
/* Paper157 */   [2, 5, 2, 7, 8, 3, 15, 5],
/* Paper158 */   [2, 10, 5, 6, 8, 5, 6, 9, 2],
/* Paper159 */   [2, 7, 4, 14, 11, 17, 5],
/* Paper160 */   [1, 15, 10, 5, 16, 14],
/* Paper161 */   [2, 11, 12, 3],
/* Paper162 */   [4, 11, 10, 5, 4, 5, 4, 6, 3, 7],
/* Paper163 */   [2, 6, 11, 7, 17, 3, 8, 4],
/* Paper164 */   [2, 4, 4, 16, 12, 6],
/* Paper165 */   [4, 3, 12, 9, 14, 7, 4],
/* Paper166 */   [2, 11, 8, 8, 12, 7],
/* Paper167 */   [3, 5, 4, 6, 7, 8, 6, 7],
/* Paper168 */   [12, 15, 10, 7, 13, 3],
/* Paper169 */   [7, 16, 8, 3, 13],
/* Paper170 */   [2, 17, 25, 11, 16, 21],
/* Paper171 */   [7, 6, 6, 5, 9, 3, 4, 10, 15],
/* Paper172 */   [3, 9, 5, 16, 3, 13],
/* Paper173 */   [3, 11, 8, 4, 5, 6],
/* Paper174 */   [3, 5, 5, 5, 7, 14],
/* Paper175 */   [2, 25, 3, 3, 15],
/* Paper176 */   [2, 7, 9, 10, 7],
/* Paper177 */   [4, 6, 7, 8, 12, 6],
/* Paper178 */   [1, 18, 12, 6],
/* Paper179 */   [5, 8, 3, 10, 8, 10],
/* Paper180 */   [3, 6, 7, 10, 6, 12, 9],
/* Paper181 */   [2, 10, 31],
/* Paper182 */   [2, 26, 13, 11],
/* Paper183 */   [5, 2, 4, 10, 8, 5],
/* Paper184 */   [3, 9, 13, 19, 6, 11],
/* Paper185 */   [4, 9, 16, 9, 3, 13, 7, 5, 2],
/* Paper186 */   [3, 7, 11, 5, 5, 9],
/* Paper187 */   [4, 11, 9, 6, 8, 8, 3],
/* Paper188 */   [3, 8, 3, 16, 13, 13],
/* Paper189 */   [3, 13, 9, 5, 14, 5],
/* Paper190 */   [5, 10, 7, 3, 2, 8],
/* Paper191 */   [13, 5, 2, 4, 7, 7, 4],
/* Paper192 */   [5, 11, 14, 3, 8],
/* Paper193 */   [6, 3, 3, 3, 14, 5, 6],
/* Paper194 */   [7, 5, 20, 20, 13],
/* Paper195 */   [18, 11, 9, 11, 5, 14, 17, 23, 13, 11, 21],
/* Paper196 */   [14, 13, 11, 35]
];

      this.lineTypeNameArray =
         {
         "papertitle" : "papertitle",
         "sectiontitle" : "sectiontitle",
         "paragraph" : "paragraph"
         };

//------------------------------------------------

//     END PROPERTIES


//     BEGIN METHODS

   this.expandExemplarDataForPaper = function (paperNumber)
      {
      if (paperNumber == this.vcurrentPaperNumber)
         {
         return;
         }
      var sectionIndex = null;
      var lineIndex = null;
      var zeroIndex = null;
      var sectionLineIndex = null;
      var lowSectionLineNumber = null;
      var highSectionLineNumber = null;
      var lineArrayNumber = null;
//      var currentLineNumberInPaper = null;
      var lineNumberInSection = null;
      this.vcurrentPaperNumber = paperNumber;
      this.lineArray = [];
      this.sectionArray = [];
      this.vnumberOfLinesInPaper = this.numberOfLinesInPaper(this.vcurrentPaperNumber);
      this.vnumberOfSectionsInPaper = this.exemplarSectionSizeArray[this.vcurrentPaperNumber].length;
      this.sectionArray[0] = new Array();
      this.sectionArray[0].sectionTitleLineNumberInPaper = 1;
      this.sectionArray[0].sectionNumber = 0;
      this.sectionArray[0].lowSectionLineNumberInPaper = 1;

      for (sectionIndex = 1; sectionIndex <= this.vnumberOfSectionsInPaper; sectionIndex++)
         {
         //fill lineNumber property in sectionArray elements
         this.sectionArray[sectionIndex] = new Array();
         this.sectionArray[sectionIndex].sectionTitleLineNumberInPaper = this.sectionArray[sectionIndex - 1].sectionTitleLineNumberInPaper + this.exemplarSectionSizeArray[this.vcurrentPaperNumber][sectionIndex - 1] + 1;
         this.sectionArray[sectionIndex].sectionNumber = sectionIndex;
         this.sectionArray[sectionIndex].lowSectionLineNumberInPaper = this.sectionArray[sectionIndex].sectionTitleLineNumberInPaper;
         this.sectionArray[sectionIndex - 1].highSectionLineNumberInPaper = this.sectionArray[sectionIndex].sectionTitleLineNumberInPaper- 1;
      //initialize numberOfSublinesInLine property in sectionArray elements to 0
         this.sectionArray[sectionIndex].numberOfSublinesInLine = 0;
         }
      this.sectionArray[this.vnumberOfSectionsInPaper - 1].highSectionLineNumberInPaper = this.vnumberOfLinesInPaper;

      //set lineType for all lines to "paragraph" and numberOfSublinesInLine to 0
      for (lineIndex = 1; lineIndex <= this.vnumberOfLinesInPaper; lineIndex++)
         {
         this.lineArray[lineIndex] = new Array();
         this.lineArray[lineIndex].lineType = "paragraph";
         }

      //set line type for first line to "paperTitle"
      this.lineArray[1].lineType = "papertitle";

      //set line type for lines that contain section titles to "sectionTitle"
      for (sectionIndex = 0; sectionIndex < this.vnumberOfSectionsInPaper; sectionIndex++)
         {
         if (sectionIndex != 0)
            {
            lineArrayNumber = this.sectionArray[sectionIndex].sectionTitleLineNumberInPaper;
            this.lineArray[lineArrayNumber].lineType = "sectiontitle";
            }

         lowSectionLineNumber = this.sectionArray[sectionIndex].lowSectionLineNumberInPaper;
         highSectionLineNumber = this.sectionArray[sectionIndex].highSectionLineNumberInPaper;

         lineNumberInSection = 0;
         //in lineArray, for each line set sectionNumberOfLine and labelSectionNumberOfLine
         for (sectionLineIndex = lowSectionLineNumber; sectionLineIndex <= highSectionLineNumber; sectionLineIndex++)
            {
            currentLineNumberInPaper = this.sectionArray[sectionIndex].sectionTitleLineNumberInPaper + lineNumberInSection;
            this.lineArray[currentLineNumberInPaper].sectionNumberOfLine = sectionIndex;
            this. lineArray[currentLineNumberInPaper].lineNumberInSection = lineNumberInSection;
            lineNumberInSection++;
            }
         }
      }

   this.expandExemplarDataForPaperWhereNecessary = function (paperNumber)
      {
      if (paperNumber != this.vcurrentPaperNumber)
         {
         this.expandExemplarDataForPaper(paperNumber);
         }
      }

   this.lineNumberInSection = function (paperNumber, lineNumber)
      {
      if (!this.paperNumberAndLineNumberAreValid(paperNumber, lineNumber))
         {
         return -1;
         }
      if (this.vcurrentPaperNumber != paperNumber)
         {
         this.expandExemplarDataForPaper(paperNumber)
         }
      return this.lineArray[lineNumber].lineNumberInSection;
      }

   this.lineType = function (paperNumber, lineNumber)
      {
      if (!this.paperNumberAndLineNumberAreValid(paperNumber, lineNumber))
         {
         return -1;
         }
      if (this.vcurrentPaperNumber != paperNumber)
         {
         this.expandExemplarDataForPaper(paperNumber);
         }
      return this.lineArray[lineNumber].lineType;
      }

   this.numberOfLinesInPaper = function (paperNumber)
      {
      if (paperNumber < 0 || paperNumber > 196)
         {
         return -1;
         }
      //paper title is first line
      var linesInPaper = 1;
      //add number of paragraphs in each section
      for (var sectionIndex = 0; sectionIndex < this.exemplarSectionSizeArray[paperNumber].length; sectionIndex++)
         {
         linesInPaper += this.exemplarSectionSizeArray[paperNumber][sectionIndex];
         }
      //add 1 for each section title line except for Sectin 0, which has no title line
      linesInPaper += this.exemplarSectionSizeArray[paperNumber].length - 1;
      return linesInPaper;
      }

   this.numberOfLinesInSection = function (paperNumber, sectionNumber)
      {
      if (paperNumber < 0 || paperNumber > 196 || sectionNumber < 0 || sectionNumber > this.exemplarSectionSizeArray[paperNumber].length - 1)
         {
         return -1;
         }
      return this.exemplarSectionSizeArray[paperNumber][sectionNumber];
      }

   this.numberOfSectionsInPaper = function (paperNumber)
      {
      if (paperNumber < 0 || paperNumber > 196)
         {
         return -1;
         }
      return this.exemplarSectionSizeArray[paperNumber].length;
      }

   this.paperNumberAndLineNumberAreValid = function (paperNumber, lineNumber)
      {
      if (paperNumber < 0 || paperNumber > 196 || lineNumber < 1)
         {
         return 0;
         }
      return 1;
      }

   this.sectionNumberOfLine = function (paperNumber, lineNumber)
      {
      if (!this.paperNumberAndLineNumberAreValid(paperNumber, lineNumber))
         {
         return -1;
         }
      if (this.currentPaperNumber != paperNumber)
         {
         this.expandExemplarDataForPaper(paperNumber)
         }
      return this.lineArray[lineNumber].sectionNumberOfLine;
      }

   this.lineNumberInPaperOfSectionTitle = function (paperNumber, sectionNumber)
      {
      if (this.currentPaperNumber != paperNumber)
         {
         this.expandExemplarDataForPaper(paperNumber)
         }
      return this.sectionArray[sectionNumber].sectionTitleLineNumberInPaper;
      }

   }

//------------------------------------------------
