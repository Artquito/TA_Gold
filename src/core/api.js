insertLesson(lessonDataModel){
    console.log("Data:");
    console.log(lessonDataModel);
    var app= this;
    var Get_Parameter  = "?Lesson_Id ="             +lessonDataModel.Lesson_Id;
    Get_Parameter     += "&Lesson_Name="            +lessonDataModel.Lesson_Name;
    Get_Parameter     += "&Lesson_Link="            +lessonDataModel.Lesson_Link;
    Get_Parameter     += "&Lesson_Description="     +lessonDataModel.Lesson_Description;
    Get_Parameter     += "&Platform_Id="            +lessonDataModel.Platform_Id;

    axios.get(base_url+'/insertLessonData.php'+Get_Parameter)
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });

}