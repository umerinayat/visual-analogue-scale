$(function () {
    
// =============== Jquery UI ==================

    var $appTabs = $('#app-tabs');
    $appTabs.tabs();

// =============== End of Jquery UI ===========

// =============== Qualitative Research Jexcel ===========

    // Dom Elements Refs
    //Qualitative Research Jexcel DOM Reference 
    $qualitativeRDiv = $('#qualitativeRDiv');
    $selectedResult = $('#selectedResult');
    var $score = $('#score');
    var $category = $('#category');
    var $slider = $('#slider');
       
    // jexcel related vars
    qualitativeRSheet = null;
    isqualitativeRSheetLoaded = false;
    currentRow = null;
    
    // qualitativeRSheet Events
    qualitativeRSheetLoaded = function () {
        isqualitativeRSheetLoaded = true;
    }

    qualitativeRSheetSelectionActive = function(instance, x1, y1, x2, y2, origin) {
        var cellName1 = jexcel.getColumnNameFromId([x1, y1]);
        var cellName2 = jexcel.getColumnNameFromId([x2, y2]);
        console.log(instance);
        console.log(qualitativeRSheet.selectedRow);
        //console.log(qualitativeRSheet.selectedCell);
        if ( qualitativeRSheet.selectedRow != null ) {
            
            currentRow = qualitativeRSheet.selectedRow; 
            if (currentRow && currentRow >=0) {
                var rowData = qualitativeRSheet.getRowData(currentRow);
                $selectedResult.text(rowData[0]);
            }
        } 
    };

    qualitativeRdata = [
        ['', , ,''],
    ];

    qualitativeRSheet = makeJexcelSheet(
        'qualitativeRDiv',
        qualitativeRdata,
        'qualitative-search',
        [
            { title:'Article', width:'300px' },
            { title:'Score', width:'300px' },
            { title:'Category', width:'300px' },
            { title:'Category Description', width:'300px' }
        ],
        qualitativeRSheetSelectionActive,
        qualitativeRSheetLoaded
    );

    $slider.slider({
        min: -3.50,
        max: 3.50,
        step: 0.01,
        value: 0,
        slide: function (event, ui) {
            
            $score.text(ui.value);
            
            if (currentRow && currentRow >=0) {
                
            if ( ui.value >= -3.50 && ui.value <= -2.51) 
            {
                console.log(currentRow);
                $category.text('Large Negative Effect');
                if (currentRow !=null) {
                    var rowData = qualitativeRSheet.getRowData(currentRow);
                    qualitativeRSheet.setRowData(currentRow,  [rowData[0], ui.value , 1, 'Large Negative Effect']);
                    $selectedResult.text(rowData[0]);
                }
                
            }
            else if ( ui.value >= -2.50 && ui.value <= -1.51) 
            {
                $category.text('Moderate Negative Effect');
                if (currentRow !=null) {
                    var rowData = qualitativeRSheet.getRowData(currentRow);
                    qualitativeRSheet.setRowData(currentRow,  [rowData[0], ui.value , 2, 'Moderate Negative Effect']);
                    $selectedResult.text(rowData[0]);
                }
                
            }
            else if ( ui.value >= -1.50 && ui.value <= -0.51) 
            {
                $category.text('Small Negative Effect');
                if (currentRow !=null) {
                    var rowData = qualitativeRSheet.getRowData(currentRow);
                    qualitativeRSheet.setRowData(currentRow,  [rowData[0], ui.value , 3, 'Small Negative Effect']);
                    $selectedResult.text(rowData[0]);
                }
                
            }
            else if ( ui.value >= -0.50 && ui.value <=  0.50) 
            {
                $category.text('No Effect');
                if (currentRow !=null) {
                    var rowData = qualitativeRSheet.getRowData(currentRow);
                    qualitativeRSheet.setRowData(currentRow,  [rowData[0],ui.value , 4,  'No Effect']);
                    $selectedResult.text(rowData[0]);
                }
                
            } 
            else if ( ui.value >= 0.51 && ui.value <=  1.50 ) 
            {
                $category.text('Small Positive Effect');
                if (currentRow !=null) {
                    var rowData = qualitativeRSheet.getRowData(currentRow);
                    qualitativeRSheet.setRowData(currentRow,  [rowData[0],ui.value , 5, 'Small Positive Effect']);
                    $selectedResult.text(rowData[0]);
                } 
            }
            else if ( ui.value >= 1.51 && ui.value <=  2.50 ) 
            {
                $category.text('Moderate Positive Effect');
                if (currentRow !=null) {
                    var rowData = qualitativeRSheet.getRowData(currentRow);
                    qualitativeRSheet.setRowData(currentRow,  [rowData[0], ui.value , 6,  'Moderate Positive Effect']);
                    $selectedResult.text(rowData[0]);
                }
                
            } 
            else if ( ui.value >= 2.51 && ui.value <=  3.50 ) 
            {
                $category.text('Large Positive Effect');
                if (currentRow !=null) {
                    var rowData = qualitativeRSheet.getRowData(currentRow);
                    qualitativeRSheet.setRowData(currentRow,  [rowData[0], ui.value ,7 , 'Large Positive Effect']);
                    $selectedResult.text(rowData[0]);
                }
                
            }

        }

        }
    });
            
// =============== End of Qualitative Research Jexcel =====


// =============== Quantitative Research Jexcel ===========
        // Dom Elements Refs
        var $quantSpreadsheetDiv = $('#quant-spreadsheet');
        var $exportQuantCsvBtn = $('#exportQuantCsvBtn');
        
        quantitativeRSheet = null;
        quantitativeRSheetLoaded = false;
       
        //  quantitativeRSheet Events
        quantitativeRSheetLoaded = function () {
            isquantitativeRSheetLoaded = true;
        }
        quantitativeRSheetSelectionActive = function(instance, x1, y1, x2, y2, origin) {
            var cellName1 = jexcel.getColumnNameFromId([x1, y1]);
            var cellName2 = jexcel.getColumnNameFromId([x2, y2]);
            console.log(instance);
            console.log(quantitativeRSheet.selectedRow);
        };
  
        makeFresh = function () {
            quantitativeRSheet = jexcel(document.getElementById('quant-spreadsheet'), {
                data:data,
                csvHeaders:true,
               
                csvFileName: 'quantitative-research',
                search:true,
                pagination:15,
                paginationOptions:[15,25,50,100],
                columns:[
                    { title:'Article', width:200 },
                    { title:"Cohen's d", width:200 },
                    { title:'Correlation', width:200 },
                    { title:'Percentage', width:200 },
                    { title:'T-Score', width:200 },
                    { title:'Z-Score', width:200 }
                ],
                onselection: quantitativeRSheetSelectionActive,
                onload: quantitativeRSheetLoaded,
            });
        }
   
        // Handling DOM Events
        $exportQuantCsvBtn.on('click', function (evt) {
            if ( quantitativeRSheet ) {
                
                if ( isquantitativeRSheetLoaded ) {
                    quantitativeRSheet.download(true);
                }
            }
        });

        data = [
            ['a','b','c','d', 'e', 'f'],
        ];
    
        makeFresh();
// =============== End of Quantitative Research Jexcel ====


// ========== Importing CSV Files ===============
    
    $qualRImportFile = $('#qualRImportFile');
    qualRImportFile = null;
    $importCsvFileModal = $('#importCsvFileModal');

    $quantRImportFile = $('#quantRImportFile');
    quantRImportFile = null;

    var $importCsvBtn = $('#importCsvBtn');

    $qualRImportFile.on('change', function (event) {
        qualRImportFile = this.files[0];
        console.log(qualRImportFile);
    });

    $quantRImportFile.on('change', function (event) {
        quantRImportFile = this.files[0];
        console.log(quantRImportFile);
    });

    var importCsvFiles = function ( event ) {
        console.log('is import')
        if ( qualRImportFile !== null )
        {
            readFile(qualRImportFile, function (result) {
                console.log(result);
                var updatedData = $.csv.toArrays(result)
                qualitativeRSheet = null;
                $qualitativeRDiv.empty();
                qualitativeRSheet = makeJexcelSheet(
                    'qualitativeRDiv',
                    qualitativeRdata,
                    'qualitative-search',
                    [
                        { title:'Article', width:'300px' },
                        { title:'Score', width:'300px' },
                        { title:'Category', width:'300px' },
                        { title:'Category Description', width:'300px' }
                    ],
                    qualitativeRSheetSelectionActive,
                    qualitativeRSheetLoaded
                );
                var headers = updatedData.shift();
                $('#qualitativeRDiv').jexcel('setData',updatedData, false);
                $importCsvFileModal.modal('hide');
            });
        }

        if ( quantRImportFile !== null )
        {
            readFile(quantRImportFile, function (result) {
                updatedData = $.csv.toArrays(result)
                quantitativeRSheet = null;
                $quantSpreadsheetDiv.empty();
                makeFresh();
                var headers = updatedData.shift();
                $('#quant-spreadsheet').jexcel('setData',updatedData, false);
            });
        }
    };
    $importCsvBtn.on('click', importCsvFiles);


// ========== End of Importing CSV Files ========

// ========= Exporting CSV Files ================

    $exportCsvFileModal = $('#exportCsvFileModal');
    $exportCsvBtn = $('#exportCsvBtn');

    $quallRCheck = $('#quallRCheck');
    isquallRExport = false;

    $quntRCheck = $('#quallRCheck');
    isquntRExport = false;

    var exportCsvFiles = function (event) {

        if ( $quallRCheck.is(":checked") ) 
        {
            if ( qualitativeRSheet ) {
                if ( isqualitativeRSheetLoaded ) {
                    qualitativeRSheet.download(true);
                    isquallRExport = true;
                }
               
            }
        }

        if ( $quntRCheck.is(":checked") ) {
            if ( quantitativeRSheet ) {
                if ( quantitativeRSheetLoaded ) {
                    quantitativeRSheet.download(true);
                    isquntRExport = true;
                }
            }
        }




        $exportCsvFileModal.modal('hide');
    };
    $exportCsvBtn.on('click', exportCsvFiles);

// ========= End Exporting CSV Files ============


$('#agreeTermsBtn').on('click', function (event) {
    $('#copyrightModal').modal('hide');
});
 
// ========== Helper Functions ========

    // File Reader
    function readFile (File, callback, encoding='UTF-8')
    {
        var reader = new FileReader();
        reader.readAsText(File, encoding);
        reader.onload = function (evt) { 
            callback(evt.target.result);
        }
    }

    // Jexcel
    function makeJexcelSheet (elementId, data, downloadCsvFileName, columns, onselectionCallback, onloadCallback ) {
        var jexcelSheet = jexcel(document.getElementById(elementId), {
            data:data,
            csvHeaders:true,
            csvFileName: downloadCsvFileName,
            search:true,
            pagination:10,
            paginationOptions:[10,25,50,100],
            columns: columns,
            onselection: onselectionCallback,
            onload: onloadCallback,
        });

        return jexcelSheet;
    }

// ========== End of Helper Functions ========


}); 