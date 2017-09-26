if(!require('dplyr'))install.packages("dplyr")
library(dplyr)

if(!require('reshape2'))install.packages("reshape2")
library(reshape2)

#Path to read data
d6 = read.table("Path/d6152.csv", sep=",")
#trim the first line and then we transpose data
d6[,1] = trimws(d6[,1])
td6 = t(d6)
#we don't want row names
rownames(td6) = NULL

td6 = as.data.frame(td6)

#We gives name to column
colnames(td6) = c("year", "Luxembourg", "Germany", "Belgium",
                  "France", "Holland", "Other countries in E.U")

#We reshape data from wide to long format
sd6 = melt(td6[-1,], id.vars=c("year")) %>%
        dplyr::rename(country = variable)
sd6[,1] = trimws(sd6[,1])
sd6[,3] = trimws(sd6[,3])

server = shinyServer(
        function(input, output, session) {
                #On click, we start to convert data to json format
                observeEvent(input$runButton, {
                        #Depending on country selected, data will change
                        df = sd6 %>%
                                filter(country %in% input$countrybox) %>%
                                as.data.frame()
                        jsd = jsonlite::toJSON(df)
                        jsd = gsub("],", ",", jsd)
                        jsd = gsub(":\\[", ":",jsd)
                        jsd = gsub("[[:space:]]", "", jsd)
                        jsd = gsub("OthercountriesinE.U", "Other countries in E.U",jsd)
                        
                        session$sendCustomMessage(type='jsondata', jsd )
                })
                
        })
