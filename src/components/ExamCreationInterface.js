import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const mockTopics = [
  "Computer Science", "English", "History"
];

const ExamCreationInterface = () => {
  const [step, setStep] = useState(1);
  const [questionPicking, setQuestionPicking] = useState('auto');
  const [topics, setTopics] = useState(mockTopics.map((topic, index) => ({
    id: index + 1,
    topic: topic,
    easy: 0,
    medium: 0,
    hard: 0
  })));
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); 
    }, 2000); 
  };

  const [formData, setFormData] = useState({
    examName: '',
    duration: '',
    negativeMarking: 0,
    easyMarks: 1,
    mediumMarks: 2,
    hardMarks: 3,
    passingScore: 35,
    requiresRegistration: false,
    captureImage: false,
    captureInterval: 30,
    instructions: 'Default exam instructions...', 
  });

  const [isValid, setIsValid] = useState(true); 
  const validateInputs = () => {
    const { examName, duration, passingScore } = formData;
    return examName.trim() !== '' && duration > 0 && passingScore > 0;
  };

  const handleNext = () => {
    if (validateInputs()) {
      setIsValid(true);
      setStep(2);
    } else {
      setIsValid(false);
    }
  };

  const addTopic = () => {
    setTopics([
      ...topics,
      { id: topics.length + 1, topic: '', easy: 0, medium: 0, hard: 0 }
    ]);
  };

  const removeTopic = (id) => {
    setTopics(topics.filter(topic => topic.id !== id));
  };

  const calculateTotal = (row) => {
    return parseInt(row.easy || 0) + parseInt(row.medium || 0) + parseInt(row.hard || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-500' : 'text-gray-500'}`}>
            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center">
              1
            </div>
            <span className="ml-2">Basic Details</span>
          </div>
          <div className="flex-1 border-t-2 border-gray-700 my-auto mx-4" />
          <div className={`flex items-center ${step >= 2 ? 'text-blue-500' : 'text-gray-500'}`}>
            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center">
              2
            </div>
            <span className="ml-2">Advanced Settings</span>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            {!isValid && <p className="text-red-500">Please fill in all required fields correctly.</p>}
            <div className="space-y-4">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <label className="block text-sm font-medium mb-2">Exam Name*</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  value={formData.examName}
                  onChange={(e) => setFormData({...formData, examName: e.target.value})}
                  placeholder="Enter exam name"
                />
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <label className="block text-sm font-medium mb-2">Duration (minutes)*</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="Enter duration in minutes"
                />
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <label className="block text-sm font-medium mb-2">Question Picking*</label>
                <select
                  className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  value={questionPicking}
                  onChange={(e) => setQuestionPicking(e.target.value)}
                >
                  <option value="auto">Auto</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Question Distribution</h3>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    onClick={addTopic}
                  >
                    <Plus size={16} />
                    <span>Add Topic</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="p-3">Topic</th>
                        <th className="p-3">Easy</th>
                        <th className="p-3">Medium</th>
                        <th className="p-3">Hard</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topics.map((topic, index) => (
                        <tr key={topic.id} className="border-t border-gray-700">
                          <td className="p-3">
                            <input
                              type="text"
                              className="bg-gray-700 border border-gray-600 rounded px-3 py-1 w-full"
                              placeholder="Select topic"
                              value={topic.topic}
                              onChange={(e) => {
                                const newTopics = [...topics];
                                newTopics[index].topic = e.target.value;
                                setTopics(newTopics);
                              }}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              className="bg-gray-700 border border-gray-600 rounded px-3 py-1 w-20"
                              value={topic.easy}
                              onChange={(e) => {
                                const newTopics = [...topics];
                                newTopics[index].easy = parseInt(e.target.value) || 0;
                                setTopics(newTopics);
                              }}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              className="bg-gray-700 border border-gray-600 rounded px-3 py-1 w-20"
                              value={topic.medium}
                              onChange={(e) => {
                                const newTopics = [...topics];
                                newTopics[index].medium = parseInt(e.target.value) || 0;
                                setTopics(newTopics);
                              }}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              className="bg-gray-700 border border-gray-600 rounded px-3 py-1 w-20"
                              value={topic.hard}
                              onChange={(e) => {
                                const newTopics = [...topics];
                                newTopics[index].hard = parseInt(e.target.value) || 0;
                                setTopics(newTopics);
                              }}
                            />
                          </td>
                          <td className="p-3">
                            {calculateTotal(topic)}
                          </td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300">
                                <Edit2 size={16} />
                              </button>
                              <button
                                className="text-red-400 hover:text-red-300"
                                onClick={() => removeTopic(topic.id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors"
                onClick={() => setStep(1)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-400 transition-colors"
                onClick={handleNext} 
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <label className="block text-sm font-medium mb-2">Negative Marking (per question)</label>
              <input
                type="number"
                className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                value={formData.negativeMarking}
                onChange={(e) => setFormData({ ...formData, negativeMarking: e.target.value })}
                placeholder="Enter negative marking per question"
              />
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <label className="block text-sm font-medium mb-2">Marks per Difficulty</label>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <input
                  type="number"
                  className="w-full sm:w-auto bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  value={formData.easyMarks}
                  onChange={(e) => setFormData({ ...formData, easyMarks: e.target.value })}
                  placeholder="Easy"
                />
                <input
                  type="number"
                  className="w-full sm:w-auto bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  value={formData.mediumMarks}
                  onChange={(e) => setFormData({ ...formData, mediumMarks: e.target.value })}
                  placeholder="Medium"
                />
                <input
                  type="number"
                  className="w-full sm:w-auto bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  value={formData.hardMarks}
                  onChange={(e) => setFormData({ ...formData, hardMarks: e.target.value })}
                  placeholder="Hard"
                />
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <label className="block text-sm font-medium mb-2">Passing Score*</label>
              <input
                type="number"
                className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                value={formData.passingScore}
                onChange={(e) => setFormData({ ...formData, passingScore: e.target.value })}
                placeholder="Enter passing score"
              />
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <label className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  checked={formData.captureImage}
                  onChange={(e) => setFormData({ ...formData, captureImage: e.target.checked })}
                />
                <span className="ml-2 text-sm text-gray-300">Capture Image During Exam</span>
              </label>
              <label className="block text-sm font-medium mb-2">Capture Interval (seconds)</label>
              <input
                type="number"
                className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                value={formData.captureInterval}
                onChange={(e) => setFormData({ ...formData, captureInterval: e.target.value })}
                placeholder="Enter capture interval in seconds"
                disabled={!formData.captureImage} 
              />
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <label className="block text-sm font-medium mb-2">Instructions</label>
              <textarea
                className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Enter exam instructions..."
                rows="4"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className={`px-6 py-2 ${loading ? 'bg-gray-500' : 'bg-blue-500'} rounded-lg hover:bg-blue-400 transition-colors`}
                onClick={handleSubmit} 
                disabled={loading} 
              >
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  'Submit'
                )}
              </button>
              <button
                className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-400 transition-colors"
                onClick={() => {
                
                }}
              >
                Publish & Send Invite
              </button>
              <button
                className="px-6 py-2 bg-gray-500 rounded-lg hover:bg-gray-400 transition-colors"
                onClick={() => {
                
                }}
              >
                Save and Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamCreationInterface;