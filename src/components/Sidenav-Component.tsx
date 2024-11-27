'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Button } from './ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from './ui/dialog'
import { DialogHeader, DialogFooter } from './ui/dialog'

const SidenavComponent = () => {

  const simpleData: any = {
    typeOfExport: "PDF",
    resumeDetails: {
      name: {
        fieldName: "Name",
        insert: true,
        firstname: {
          fieldName: "First Name",
          required: true,
          value: ""
        },
        lastname: {
          fieldName: "Last Name",
          required: false,
          value: ""
        }
      },
      contactdetails: {
        fieldName: "Contact Details",
        insert: true,
        email: {
          fieldName: "Email",
          required: true,
          value: ""
        },
        phone: {
          fieldName: "Phone",
          required: true,
          value: ""
        },
        website: {
          fieldName: "Website",
          required: false,
          value: ""
        },
        github: {
          fieldName: "Github",
          required: false,
          value: ""
        },
        twitter: {
          fieldName: "Twitter",
          required: false,
          value: ""
        },
        linkedin: {
          fieldName: "Linkedin",
          required: false,
          value: ""
        }
      },
      skills: {
        fieldName: "Skills",
        insert: false,
        personalskills: {
          fieldName: "Personal Skills",
          required: false,
          value: []
        },
        professionalskills: {
          fieldName: "Professional Skills",
          required: false,
          value: []
        }
      }
    }
  }

  const [sampleData, setSampleData] = useState(simpleData);
  const [skillData, setSkillData] = useState('')
  const [skillDataArray, setSkillDataArray] = useState<any>({
    fieldName: "",
    values: []
  })
  const [multipleSkillDataArray, setMultipleSkillDataArray] = useState<any>({});
  const [newPropertyInsertion, setNewPropertyInsertion] = useState({
    resumeField: "",
    fieldName: "",
    displayName: "",
    value: "",
    required: false
  });

  useEffect(() => {
    // console.log(skillDataArray);
    if (multipleSkillDataArray['fieldName'].length > 0) {
      setMultipleSkillDataArray({
        ...multipleSkillDataArray,
        [multipleSkillDataArray['fieldName']]: [...multipleSkillDataArray['values'], skillData]
      })
    } else {
      setMultipleSkillDataArray({
        ...multipleSkillDataArray,
        [skillDataArray['fieldName']]: [...skillDataArray['values']]
      })
      // setMultipleSkillDataArray({
      //   ...multipleSkillDataArray,
      //   [skillDataArray['fieldName']]: [...skillDataArray['values']]
      // });
    }
  }, [skillDataArray])

  useEffect(() => {
    console.log(multipleSkillDataArray);
  }, [multipleSkillDataArray]);

  useEffect(() => {
    // console.log(newPropertyInsertion);
  }, [newPropertyInsertion]);

  useEffect(() => {
    console.log(sampleData);
  }, [sampleData]);

  //TODO : On adding a new skill, it should be added to the skills array
  //TODO : On removing a skill, it should be removed from the skills array
  //TODO : Adding new skill in another segment should not erase the previous segments skills
  //TODO : Adding new segment itself should not erase the previous segments skills

  const handleExistingProperty = (event: any, resumeField: string) => {
    const { id, value } = event.target;
    console.log(id, value, resumeField);

    if (resumeField !== "skills") {
      setSampleData({
        ...sampleData,
        resumeDetails: {
          ...sampleData.resumeDetails,
          [String(resumeField).toLowerCase().replaceAll(" ", "")]: {
            ...sampleData.resumeDetails[String(resumeField).toLowerCase().replaceAll(" ", "")],
            [String(id).toLowerCase().replaceAll(" ", "")]: {
              ...sampleData.resumeDetails[String(resumeField).toLowerCase().replaceAll(" ", "")][String(id).toLowerCase().replaceAll(" ", "")],
              fieldName: id,
              value: value,
            }
          }
        },
      });
    } else if (resumeField === "skills") {
      setSampleData({
        ...sampleData,
        resumeDetails: {
          ...sampleData.resumeDetails,
          [String(resumeField).toLowerCase().replaceAll(" ", "")]: {
            ...sampleData.resumeDetails[String(resumeField).toLowerCase().replaceAll(" ", "")],
            [String(id).toLowerCase().replaceAll(" ", "")]: {
              ...sampleData.resumeDetails[String(resumeField).toLowerCase().replaceAll(" ", "")][String(id).toLowerCase().replaceAll(" ", "")],
              fieldName: id,
              value: value,
            }
          }
        },
      });
    }
  }

  const handleNewPropertyInsertion = (event: any, resumeField: string) => {
    const { id, value } = event.target;
    // console.log(event.target.value);

    if (newPropertyInsertion.resumeField !== resumeField) { // If the resumeField is changed, then reset the newPropertyInsertion
      setNewPropertyInsertion({
        resumeField: resumeField,
        fieldName: "",
        displayName: "",
        value: "",
        required: false
      });
    } else {
      setNewPropertyInsertion({
        ...newPropertyInsertion,
        resumeField: resumeField,
        [id]: value
      });
    }

    // sampleData['resumeDetails'][resumeField] = event.target.value;
  }

  const insertNewProperty = () => {
    console.log(newPropertyInsertion);
    if (newPropertyInsertion.fieldName && newPropertyInsertion.displayName && newPropertyInsertion.value) {
      setSampleData({
        ...sampleData,
        resumeDetails: {
          ...sampleData.resumeDetails,
          [String(newPropertyInsertion.resumeField).toLowerCase().replaceAll(" ", "")]: {
            ...sampleData.resumeDetails[String(newPropertyInsertion.resumeField).toLowerCase().replaceAll(" ", "")],
            [String(newPropertyInsertion.fieldName).toLowerCase().replaceAll(" ", "")]: {
              fieldName: newPropertyInsertion.displayName,
              value: newPropertyInsertion.value,
              required: newPropertyInsertion.required
            }
          }
        },
      });
    }
  }


  return (
    <Card className='w-2/5 h-screen mx-2 border-black shadow-2xl p-2'>
      <CardHeader className='px-4'>
        <CardTitle className='leading-tight'>Add your own <span className='bg-gradient-to-r from-blue-500 to-fuchsia-700 bg-clip-text text-transparent'>Attributes</span> in this form</CardTitle>
        <CardDescription>
          Basically you just input the information in the input boxes and click on the button to add it to the resume.
        </CardDescription>
      </CardHeader>
      <CardContent className='overflow-auto h-[70%] p-2'>
        <div className='font-inter w-full'>
          <Accordion type='single' collapsible className='space-y-2' >
            {
              Object.values(sampleData['resumeDetails']).map((data: any, index) => {
                // console.log(data, index);
                return (
                  <AccordionItem key={index} value={data.fieldName}>
                    <AccordionTrigger>
                      {data.fieldName}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='flex flex-col gap-3 p-2'>
                        {
                          // Mapping over an object to create a list of inputs
                          Object.values(data).map((subData: any, index: number) => {
                            return (
                              // Checking if the object has the required properties only then rendering the required fields
                              subData.hasOwnProperty("fieldName") && subData.hasOwnProperty("value") ?
                                // If the object has the required properties, then render the input field
                                subData.required ? (
                                  <div className="grid w-full max-w-sm items-center gap-1.5 font-inter" key={index}>
                                    <Label htmlFor={subData.fieldName} className='px-2 py-1'>{subData.fieldName} *</Label>
                                    <Input type='text' id={subData.fieldName} placeholder={subData.fieldName} required onChange={(e) => handleExistingProperty(e, data.fieldName)} />
                                  </div>
                                ) : (
                                  // If the object doesn't have the required properties, then render the input field
                                  <div className="grid w-full max-w-sm items-center gap-1.5 font-inter">
                                    <Label htmlFor={subData.fieldName} className='px-2 py-1'>{subData.fieldName}</Label>
                                    <Input type='text' id={subData.fieldName} placeholder={subData.fieldName}
                                      {...(subData.fieldName === "Personal Skills" || subData.fieldName === "Professional Skills") ? { onChange: (e) => setSkillData(e.target.value) } : {
                                        onChange: (e) => handleExistingProperty(e, data.fieldName)
                                      }}
                                      {
                                      ...(subData.fieldName === "Personal Skills" || subData.fieldName === "Professional Skills") ? {
                                        onKeyDown: (e) =>
                                          (e.key === "Enter") ?
                                            skillDataArray['fieldName'] == subData.fieldName ? setSkillDataArray({
                                              ...skillDataArray,
                                              values: [...skillDataArray['values'], skillData]
                                            }) : setSkillDataArray({
                                              ...skillDataArray,
                                              fieldName: subData.fieldName,
                                              values: [skillData]
                                            })
                                            : null
                                      } : {
                                        onKeyDown: (e) =>
                                          (e.key === "Enter") ? handleExistingProperty(e, data.fieldName) : null
                                      }
                                      }
                                    />
                                    {
                                      (subData.fieldName === "Personal Skills" || subData.fieldName === "Professional Skills") && skillDataArray['values'].length > 0 ?
                                        <div className="grid w-full max-w-sm items-center gap-1.5 font-inter">
                                          {
                                            skillDataArray["fieldName"] == subData.fieldName && skillDataArray['values'].map((skill: string, index: number) => {
                                              return (
                                                <div className='flex flex-col gap-1 py-1 px-2' key={index}>
                                                  <h4 className='opacity-50'>{skill}</h4>
                                                </div>
                                              )
                                            })
                                          }
                                        </div> : null
                                    }
                                    {
                                      subData.fieldName === "Personal Skills" || subData.fieldName === "Professional Skills" ?
                                        <Button variant="default" className='bg-blue-600 hover:bg-blue-600/90' onClick={(e) => {

                                          skillDataArray['fieldName'] == subData.fieldName ? setSkillDataArray({
                                            ...skillDataArray,
                                            values: [...skillDataArray['values'], skillData]
                                          }) : setSkillDataArray({
                                            ...skillDataArray,
                                            fieldName: subData.fieldName,
                                            values: [skillData]
                                          })
                                        }}>Add</Button> : null
                                    }
                                    {
                                      subData.fieldName === "Personal Skills" || subData.fieldName === "Professional Skills" ?
                                        <Button variant="ghost" className='text-red-600' onClick={() => setSkillDataArray((prevState: string[]) => prevState.filter(item => item !== skillData))}>Remove</Button> : null

                                    }
                                  </div>
                                ) : null
                            )
                          })
                        }
                        <br />
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">Add new value</Button>
                          </DialogTrigger>
                          <DialogContent onChange={(e) => handleNewPropertyInsertion(e, data.fieldName)} className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Add new value</DialogTitle>
                              <DialogDescription>
                                You can add your own custom values to the resume.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fieldName" className="text-right">
                                  Field name
                                </Label>
                                <Input
                                  id="fieldName"
                                  className="col-span-3"
                                />
                              </div>

                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="displayName" className="text-right">
                                  Display Name
                                </Label>
                                <Input
                                  id="displayName"
                                  className="col-span-3"
                                />
                              </div>

                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="value" className="text-right">
                                  Value
                                </Label>
                                <Input
                                  id="value"
                                  className="col-span-3"
                                />
                              </div>

                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="required" className="text-right">
                                  isRequired
                                </Label>
                                <Input
                                  type='checkbox'
                                  id="required"
                                  className="col-span-1 w-6 h-6 rounded-md"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose className='w-full text-sm'>Cancel</DialogClose>
                              <DialogClose type="submit" onClick={insertNewProperty} className='w-full h-10 text-black rounded-md text-md bg-gradient-to-r from-blue-200 to-fuchsia-300'>Save</DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })
            }
          </Accordion>
        </div>
      </CardContent>
    </Card>
  )
}

export default SidenavComponent