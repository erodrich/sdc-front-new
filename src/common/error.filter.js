export default (errorValue) => {
    if(errorValue.data){
        console.log(errorValue.data);
    }
    return `${errorValue.data}`
}
