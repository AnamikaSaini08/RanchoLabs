export  const generateCode = (primaryWorkspace,javascriptGenerator) => {
    var code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    console.log(code);
    var codeArray = code.split(',').slice(0, -1);
    return codeArray;
  };