#include <emscripten/val.h>
#include <emscripten/bind.h>
#include <string>

int fib(int a);

void Console_log(std::string message){
    emscripten::val::global("console").call<emscripten::val>("log", message);
}

std::string GetLocation(){
    auto windowObj = emscripten::val::global("window");
    auto locationObj = windowObj["location"];
    auto href = locationObj["href"].as<std::string>();
    Console_log("Call GetLocation!");
    return href;
}

EMSCRIPTEN_BINDINGS(location){
    emscripten::function("GetLocation", GetLocation);
    emscripten::function("Fib", fib);
}