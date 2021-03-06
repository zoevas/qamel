/*******************************************************************************
 * Copyright (c) 2015 Eclipse RDF4J contributors, Aduna, and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Distribution License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/org/documents/edl-v10.php.
 *******************************************************************************/
/// <reference path="template.ts" />
/// <reference path="jquery.d.ts" />
// WARNING: Do not edit the *.js version of this file. Instead, always edit the
// corresponding *.ts source in the ts subfolder, and then invoke the
// compileTypescript.sh bash script to generate new *.js and *.js.map files.
var workbench;
(function (workbench) {
    var create;
    (function (create) {
        create.id = $('#id');
    })(create = workbench.create || (workbench.create = {}));
})(workbench || (workbench = {}));
/**
 * Invoked by the "Create" button on the form for all but
 * create-federate.xsl. Checks with the InfoServlet for the user-provided id
 * for the existence of the id already, giving a chance to back out if it
 * does. Depends on the current behavior of getting a failure response (500
 * Internal Server Error at present), when the ID does not exist.
 */
function checkOverwrite() {
    var submit = false;
    $.ajax({
        url: '../' + workbench.create.id.val() + '/info',
        async: false,
        success: function () {
            submit = confirm('WARNING: You are about to overwrite the ' +
                'configuration of an existing repository!');
        },
        statusCode: {
            500: function () {
                submit = true;
            }
        }
    });
    if (submit) {
        $("form[action='create']").submit();
    }
}
workbench.addLoad(function createPageLoaded() {
    /**
     * Disables the create button if the id field doesn't have any text.
     */
    function disableCreateIfEmptyId() {
        $('input#create').prop('disabled', !(/.+/.test($('#id').val())));
    }
    // Populate parameters
    var elements = workbench.getQueryStringElements();
    for (var i = 0; elements.length - i; i++) {
        var pair = elements[i].split('=');
        var value = decodeURIComponent(pair[1]).replace(/\+/g, ' ');
        if (pair[0] == 'id') {
            workbench.create.id.val(value);
        }
        if (pair[0] == 'title') {
            $('#title').val(value);
        }
    }
    disableCreateIfEmptyId();
    // Calls another function with a delay of 0 msec. (Workaround for 
    // annoying browser behavior.)
    $('#id').on('keydown paste cut', function () {
        setTimeout(disableCreateIfEmptyId, 0);
    });
});
//# sourceMappingURL=create.js.map